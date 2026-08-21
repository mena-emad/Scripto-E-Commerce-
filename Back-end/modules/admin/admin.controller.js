import catchAsync from "../../utils/catchAsync.js";
import {staticsService, viewVendorDetailsService,approveproductService, viewUserDetailsService, viewProductDetailsService, approveVendorService, userService, vendorService, productService} from "./admin.service.js";

export const statics = catchAsync(async (req, res, next) => {
    const statics = await staticsService();
    res.status(200).json({ statics });
});

export const viewVendorDetails = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const vendorDetails = await viewVendorDetailsService(id);
    res.status(200).json({ vendorDetails });
});

export const viewUserDetails = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const userDetails = await viewUserDetailsService(id);
    res.status(200).json({ userDetails });
});

export const viewProductDetails = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const productDetails = await viewProductDetailsService(id);
    res.status(200).json({ productDetails });
});

export const approveVendor = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const approvedVendor = await approveVendorService(id);
    res.status(200).json({ vendor: approvedVendor });
});

export const users = catchAsync(async (req, res, next) => {
    const query = req.query;
    const result = await userService(query);
    res.status(200).json(result);
});

export const vendors = catchAsync(async (req, res, next) => {
    const query = req.query;
    const result = await vendorService(query);
    res.status(200).json(result);
});

export const products = catchAsync(async (req, res, next) => {
    const query = req.query;
    const result = await productService(query);
    res.status(200).json(result);
});

export const approveProduct = catchAsync(async (req,res,next)=>{
    const { id } = req.params;
    const product = await approveproductService(id);
    res.status(200).json({message:"Product approved successfully",product});
})
