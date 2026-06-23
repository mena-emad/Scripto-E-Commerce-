import vendorModel from "../../data/models/Vendor.js";
import productModel from "../../data/models/Product.js";
import AppError from "../../utils/AppError.js";
import {v2 as cloudinary} from "cloudinary";
//======== helpers ========
// async function  getVendorId(userId){
//     const vendor = await vendorModel.findOne({owner:userId});
//     if(!vendor) throw new AppError("this user does not have a vendor profile",400);
//     return vendor._id
// }
//======== create product service ========
export const createProductService = async(productData)=>{
    const product = await productModel.create(productData);
    return product;
}


//======== get products service ========
export const getProductsService = async(to,vendorId,query={})=>{
    const page = query.page || 1;
    const limit = query.limit || 10;
    let filter = {};
    switch (to){
        case "vendor":
            filter = {vendor:vendorId};
            break;
        case "admin":
            filter = {};
            break;
        case "user":
            filter = {isApproved:true};
            break;
        default:
            filter = {isApproved:true};
            break;
    }
    const products = await productModel.find(filter).sort({createdAt:-1}).skip((page-1)*limit).limit(limit);
    if(products.length===0) throw new AppError("No products found",400);
    return products;
}

//======== update product service ========
export const updateProductService = async(id,vendorId,productData)=>{
    const product = await productModel.findById(id);
    if(!product) throw new AppError("Product does not exist",400);
    if(product.vendor.toString()!==vendorId.toString()) throw new AppError("You are not authorized to update this product",400);
    const updatedProduct = {
        name:productData.name??product.name,
        description:productData.description??product.description,
        price:productData.price??product.price,
        category:productData.category??product.category,
        quantity:productData.quantity??product.quantity,
        images:productData.images??product.images
    }
    Object.assign(product,updatedProduct);
    await product.save();
    return product;
}

//======== delete Product ========
export const deleteProductService = async(productId,req)=>{
    const product = await productModel.findById(productId);
    if(!product) throw new AppError("Product does not exist",400);
    if(req.user.role!== "admin" && product.vendor.toString()!==String(req.vendor?._id) )throw new AppError("You are not authorized to delete this product",400);
    if(product.images.length>0){
        for(const image of product.images){
            if(image.public_id){
                await cloudinary.uploader.destroy(image.public_id);
            }
        }
    }
    await productModel.findByIdAndDelete(productId);
    return product;
}