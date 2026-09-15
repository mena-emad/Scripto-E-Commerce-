import cartModel from "../../data/models/Cart.js";
import productModel from "../../data/models/Product.js";
import AppError from "../../utils/AppError.js";
//======== calculate price ========
const calculatePrice = async (cart)=>{
    await cart.populate("products.product");
    if(!cart.products || cart.products.length === 0){
        cart.totalPrice = 0;
        await cart.save();
        return;
    }
    cart.products = cart.products.filter((product)=>product.product!==null );
    let totalPrice = 0;
    for(const item of cart.products){
        const salePrice = item.product.salePrice || item.product.price;
        item.price = salePrice;
        totalPrice += (salePrice * item.quantity);
    }
    cart.totalPrice = totalPrice;    
    await cart.save();
    await cart.populate("products.product");
}
//======== add to cart service ========
export const addToCartService = async (req)=>{
    const product = await productModel.findById(req.body.productId);
    if(!product) throw new AppError("Product does not exist",400);
    if(product.status !== "approved" || !product.isActive) throw new AppError("Product is not available",400);
    if(req.body.quantity > product.quantity) throw new AppError(`Only ${product.quantity} left in stock`,400);
    if(req.user.role === "vendor" && String(req.vendor._id) === product.vendor.toString()) throw new AppError("You cannot add your own product to cart",400);
    let cart = await cartModel.findOne({user:req.user._id});
    if(!cart){
        const cartData = {
            user:req.user._id,
            products:[
                {
                    product:req.body.productId,
                    quantity:req.body.quantity,
                    vendor:product.vendor
                }
            ]
        }
        const newCart = await cartModel.create(cartData);
        cart = newCart;
    }else{
        const productIndex = cart.products.findIndex((product)=>product.product.toString() === req.body.productId.toString());
        if(productIndex === -1){
            cart.products.push({
                product:req.body.productId,
                quantity:req.body.quantity,
                vendor:product.vendor
            })
        }else{
            if(parseInt(cart.products[productIndex].quantity)+parseInt(req.body.quantity) > product.quantity) throw new AppError(`Only ${product.quantity} left in stock`,400);
            cart.products[productIndex].quantity += parseInt(req.body.quantity);
        }
        
    }
    await calculatePrice(cart);
    return cart;

}
//======== update cart service ========

export const updateCartService = async(quantity,userId,productId)=>{
    const cart = await cartModel.findOne({user:userId});
    const product = await productModel.findById(productId);
    if(!cart) throw new AppError("Cart does not exist",400);
    if(!product) throw new AppError("Product does not exist",400);
    const productIndex = cart.products.findIndex((product)=>product.product.toString()===productId.toString());
    if(productIndex === -1) throw new AppError("Product does not exist in cart",400);
    if(quantity > product.quantity) throw new AppError(`Only ${product.quantity} left in stock`,400);
    cart.products[productIndex].quantity = quantity;
    await calculatePrice(cart);
    return cart;
}
//======== remove from cart service ========
export const removeFromCartService = async(userId,productId)=>{
    const cart = await cartModel.findOne({user:userId});
    if(!cart) throw new AppError("Cart does not exist",400);
    const productIndex = cart.products.findIndex((product)=>product.product.toString()===productId.toString());
    if(productIndex === -1) throw new AppError("Product does not exist in cart",400);
    const deletedProduct = cart.products.splice(productIndex,1)[0];
    await calculatePrice(cart);
    return {cart,deletedProduct};
}

//======== clear cart service ========
export const clearCartService = async(userId)=>{
    const cart = await cartModel.findOne({user:userId});
    if(!cart) throw new AppError("Cart does not exist",400);
    cart.products = [];
    await calculatePrice(cart);
    return cart;
}

// ========= get my cart service ========
export const getMyCartService = async(userId)=>{
    let cart = await cartModel.findOne({user:userId});
    if(!cart) {
        return {
            products:[],
            totalPrice:0
        }
    }
    await calculatePrice(cart);
    return cart;
}