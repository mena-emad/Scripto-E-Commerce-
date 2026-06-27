import catchAsync from "../../utils/catchAsync.js"
import {addToCartService,updateCartService,removeFromCartService,clearCartService,getMyCartService} from "./cart.service.js"
//======== add to cart controller ========
export const addToCart = catchAsync(async (req,res,next)=>{
    const cart = await addToCartService(req);
    res.status(200).json({cart,message:"Product added to cart successfully",Navigate:"/cart"});
})
//======== update cart controller ========
export const updateProduct = catchAsync(async (req,res,next)=>{
    const cart = await updateCartService(req.body.quantity,req.user._id,req.body.productId);
    res.status(200).json({cart,message:"Cart updated successfully",Navigate:"/cart"});
})
//======== remove from cart controller ========
export const removeFromCart = catchAsync(async (req,res,next)=>{
    const {cart,deletedProduct} = await removeFromCartService(req.user._id,req.body.productId);
    res.status(200).json({cart,deletedProduct,message:"Product removed from cart successfully",Navigate:"/cart"});
})

//======== clear cart controller ========
export const clearCart = catchAsync(async (req,res,next)=>{
    const cart = await clearCartService(req.user._id);
    res.status(200).json({cart,message:"Cart cleared successfully",Navigate:"/cart"});
})

export const getMyCart = catchAsync(async (req,res,next)=>{
    const cart = await getMyCartService(req.user._id);
    res.status(200).json({cart,message:"Cart fetched successfully"});
})