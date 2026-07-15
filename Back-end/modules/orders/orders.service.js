import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/AppError.js";
import mongoose from "mongoose";
import {internalValidation} from "../../middlewares/validation.js";
import cartModel from "../../data/models/Cart.js";
import {parentOrderModel , subOrderModel} from "../../data/models/Orders.js" ;
import productModel from "../../data/models/Product.js";
import {parentOrderFullValidation , subOrderValidation} from "./orders.validation.js"

export const makeOrderService = async (orderData, userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const cart = await cartModel.findOne({ user: userId }).populate("products.product").session(session);
        if (!cart || cart.products.length === 0) {
            throw new AppError("Cart is empty", 400);
        }

        const itemsByVendor = {};
        const parentTotalPrice = cart.totalPrice; 

        for (const item of cart.products) {
            const product = item.product;
            if (!product) throw new AppError("Product does not exist", 400);
            if (!product.isApproved) throw new AppError("Product is not approved", 400);
            
            const vendorId = (product.vendor._id || product.vendor).toString();
            if (vendorId === userId.toString()) 
                throw new AppError("You cannot order your own product", 400);
            
            if (product.quantity === 0 || product.isActive !== "active") {
                throw new AppError(`Product "${product.name}" is out of stock`, 400);
            }
            
            if (item.quantity > product.quantity) {
                throw new AppError(`Only ${product.quantity} left in stock for ${product.name}`, 400);
            }

            if (!itemsByVendor[vendorId]) {
                itemsByVendor[vendorId] = [];
            }

            itemsByVendor[vendorId].push({
                product: product._id,
                quantity: item.quantity,
                price: item.price,
                vendor: product.vendor
            });
        }

        const parentProducts = cart.products.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.price,
            vendor: item.product.vendor._id || item.product.vendor
        }));
        
        const totalAmount = parentProducts.reduce((acc, curr) => acc + curr.quantity, 0);
        const parantOrderPayLoad = {
            ...orderData,
            totalPrice: parentTotalPrice,
            totalAmount: totalAmount,
            user: userId,
            products: parentProducts
        };
        
        internalValidation(parentOrderFullValidation, parantOrderPayLoad);
        const [parentOrder] = await parentOrderModel.create([parantOrderPayLoad], { session });

        for (const vendorId in itemsByVendor) {
            const vendorItems = itemsByVendor[vendorId];
            
            const subTotalPrice = vendorItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
            const subTotalAmount = vendorItems.reduce((acc, curr) => acc + curr.quantity, 0); 
            const subOrderPayLoad = {
                parentOrder: parentOrder._id,
                vendor: vendorId,
                products: vendorItems,
                totalPrice: subTotalPrice,
                totalAmount: subTotalAmount
            };
            
            internalValidation(subOrderValidation, subOrderPayLoad);
            await subOrderModel.create([subOrderPayLoad], { session });

            for (const item of vendorItems) {
                const updatedProduct = await productModel.findOneAndUpdate(
                    {
                        _id: item.product,
                        quantity: { $gte: item.quantity }
                    },
                    [
                        { 
                            $set: { 
                                quantity: { $subtract: ["$quantity", item.quantity] } 
                            } 
                        },
                        { 
                            $set: { 
                                isActive: { 
                                    $cond: { 
                                        if: { $eq: ["$quantity", 0] }, 
                                        then: "out of stock", 
                                        else: "$isActive" 
                                    } 
                                } 
                            } 
                        }
                    ],
                    { session, new: true }
                );
                
                if (!updatedProduct) {
                    throw new AppError("Product is no longer available or stock is insufficient", 400);
                }
            }
        }

        await cartModel.findOneAndUpdate(
            { user: userId },
            { $set: { products: [], totalPrice: 0 } },
            { session }
        );

        await session.commitTransaction();
        return parentOrder;
        
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(err.message, err.statusCode || 400);
    } finally {
        session.endSession();
    }

};