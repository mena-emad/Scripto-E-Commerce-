import { createProductService, getProductsService, updateProductService, deleteProductService } from "./products.service.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
//======== create product controller ========
export const createProduct = catchAsync(async(req,res,next)=>{
    const productData = {
        ...req.body,
        vendor:req.vendor._id,
    }
    const product = await createProductService(productData,req.files);
    res.status(201).json({product,message:"Product created successfully",Navigate:"/vendor/products"});
})
//======== get products controller ========
export const getProducts = catchAsync(async(req,res,next)=>{
    const products = await getProductsService({isApproved:true},req.query);
    const isBuyer = !!req.user;
    const isAdmin = !!req.user && req.user.role === "admin";
    const isVendor = !!req.user && req.user.role === "vendor";
    const vendorId = req.vendor ? req.vendor?._id : null;
    res.status(200).json({vendorId,isBuyer,isAdmin,isVendor,products , message:"Products fetched successfully"});
})

//======== update product controller ========
export const updateProduct = catchAsync(async(req,res,next)=>{
    const updatedProduct = await updateProductService(req.params.id,req.vendor._id,req.body,req.files);
    res.status(200).json({updatedProduct,message:"Product updated successfully",Navigate:"/vendor/products"});
})

//======== delete product controller ========
export const deleteProduct = catchAsync(async(req,res,next)=>{
    await deleteProductService(req)
    res.status(200).json({message:"Product deleted successfully"});
})

