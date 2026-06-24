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
export const createProductService = async(productData,files)=>{
    if(!files || files.length === 0) throw new AppError("Product image is required",400);
    if(files && files.length > 5) throw new AppError("Only 5 images are allowed",400);
    const images = files.map((file)=>{
        return {
            url:file.path,
            public_id:file.filename
        }
    })
    const data = {
        ...productData,
        images
    }
    const product = await productModel.create(data);
    return product;
}


//======== get products service ========
export const getProductsService = async(filter={},query={})=>{
    const page = query.page || 1;
    const limit = query.limit || 10;
    const products = await productModel.find(filter).populate("vendor").sort({createdAt:-1}).skip((page-1)*limit).limit(limit);
    return products;
}

//======== update product service ========
export const updateProductService = async(id,vendorId,productData,files)=>{
    const product = await productModel.findById(id);
    if(!product) throw new AppError("Product does not exist",400);
    if(product.vendor.toString()!==vendorId.toString()) throw new AppError("You are not authorized to update this product",400);
    let images = product.images;
    if(files && files.length >0){
        if(files && files.length > 5) throw new AppError("Only 5 images are allowed",400);
        if(product.images.length>0){
            for(const image of product.images){
                if(image.public_id){
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }

        }
        images = files.map((file)=>{
            return {
                url:file.path,
                public_id:file.filename
            }
        })
    }
    const updatedProduct = {
        name:productData.name??product.name,
        description:productData.description??product.description,
        price:productData.price??product.price,
        category:productData.category??product.category,
        quantity:productData.quantity??product.quantity,
        images:images
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
