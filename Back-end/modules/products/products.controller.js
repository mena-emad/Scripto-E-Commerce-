import { createProductService, getProductsService, updateProductService, deleteProductService } from "./products.service.js";
import catchAsync from "../../utils/catchAsync.js";
//======== create product controller ========
export const createProduct = catchAsync(async(req,res,next)=>{
    const images = {
        url:req.file.path,
        public_id:req.file.filename
    }
    const productData = {
        ...req.body,
        images,
        vendor:req.vendor._id
    }
    const product = await createProductService(productData);
    res.status(201).json({product,message:"Product created successfully",Navigate:"/vendor/products"});
})
//======== get products controller ========
export const getProducts = catchAsync(async(req,res,next)=>{
    const vendorId = req.vendor?._id||null;
    const role = req.user?.role||"user";
    const products = await getProductsService(role,vendorId,req.query);
    res.status(200).json({products , message:"Products fetched successfully"});
})

//======== update product controller ========
export const updateProduct = catchAsync(async(req,res,next)=>{
    const data = {
        images:{
            url:req.file.path,
            public_id:req.file.filename
        },
        ...req.body
    }
    const updatedProduct = await updateProductService(req.params.id,req.vendor._id,data);
    res.status(200).json({updatedProduct,message:"Product updated successfully",Navigate:"/vendor/products"});
})

//======== delete product controller ========
export const deleteProduct = catchAsync(async(req,res,next)=>{
    await deleteProductService(req.params.id,req)
    res.status(200).json({message:"Product deleted successfully"});
})