import userModel from "../../data/models/User.js";
import productModel from "../../data/models/Product.js";
import {parentOrderModel} from "../../data/models/Orders.js";
import vendorModel from "../../data/models/Vendor.js";
import AppError from "../../utils/AppError.js";
import {pagination , calcualteTotalPages} from "../../utils/pagination.js";

export const staticsService = async (query)=>{
    const {offset , limit} = pagination(query?.pages || 1,query?.limit || 15);
    const totalSalesPromise = parentOrderModel.aggregate([
        {
            $match:{
                globalStatus:"Delivered"
            }
        },
        {
            $group:{
                _id:null,
                totalSales:{$sum:"$totalPrice"}
            }
        }
    ])
    const totalOrdersPromise =  parentOrderModel.countDocuments({})
    const totalProductsPromise =  productModel.countDocuments({});
    const totalVendorsPromise =  userModel.countDocuments({role:"vendor"});
    const totalUsersPromise =  userModel.countDocuments({role:"user"});
    const totalPendingProductsPromise =  productModel.countDocuments({status:"pending"});
    const pendingProductsPromise =  productModel.find({status:"pending"}).limit(limit).skip(offset).lean();
    const totalPendingVendorsPromise =  vendorModel.countDocuments({isApproved:false});
    const pendingVendorsPromise =  vendorModel.find({isApproved:false}).select("storeName storeLogo _id").limit(limit).skip(offset).lean();
    const [totalOrders , totalProducts , totalVendors , totalUsers,totalPendingProducts,pendingProducts,totalPendingVendors,pendingVendors,totalSales] = await Promise.all([totalOrdersPromise,totalProductsPromise,totalVendorsPromise,totalUsersPromise,totalPendingProductsPromise,pendingProductsPromise,totalPendingVendorsPromise,pendingVendorsPromise,totalSalesPromise]);
    const totalSalesResult = totalSales[0]?.totalSales || 0
    const totalPendingPages = calcualteTotalPages(totalPendingProducts,limit);
    const totalPendingVendorsPages = calcualteTotalPages(totalPendingVendors,limit);
    return { totalPendingPages,totalPendingVendorsPages,totalSalesResult,totalOrders,totalProducts,totalVendors,totalUsers,totalPendingProducts,pendingProducts,totalPendingVendors,pendingVendors };
}

export const viewVendorDetailsService = async (id)=>{
    const vendorDetails = await vendorModel.findById(id).populate("owner","name email isBlocked image").lean();
    if(!vendorDetails)
        throw new AppError("Vendor does not exist",400);
    return vendorDetails;
}

export const viewUserDetailsService = async (id)=>{
    const userDetails = await userModel.findById(id).lean();
    if(!userDetails)
        throw new AppError("User does not exist",400);
    return userDetails;
}

export const viewProductDetailsService = async (id)=>{
    const productDetails = await productModel.findById(id).populate({path:"vendor",populate:{path:"owner"}}).lean();
    if(!productDetails)
        throw new AppError("Product does not exist",400);
    return productDetails;
}

export const approveVendorService = async (id)=>{
    const vendor = await vendorModel.findById(id);
    if(!vendor)
        throw new AppError("Vendor does not exist",400);
    if(vendor.isApproved)
        throw new AppError("Vendor is already approved",400);
    vendor.isApproved = true;
    await vendor.save({validateBeforeSave:false});
    return vendor;
}

export const userService  = async(query)=>{
    const {offset , limit} = pagination(query?.pages || 1,query?.limit || 15);
    let filter = {role:"user"};
    const keyword = query?.search?.trim() || "";
    if(keyword){
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.$or = [{name:{$regex:`^${escaped}`,$options:"i"}},{email:{$regex:escaped,$options:"i"}}]
    }
    const usersPromise = userModel.find(filter).select("name email _id image isBlocked").limit(limit).skip(offset).lean();
    const totalUsersPromise = userModel.countDocuments(filter);
    const [users , totalUsers] = await Promise.all([usersPromise,totalUsersPromise]);
    const totalPages = calcualteTotalPages(totalUsers,limit);
    return {users,totalPages};
}

export const vendorService = async(query)=>{
    const {offset,limit} = pagination(query?.pages || 1,query?.limit || 15);
    let filter = {};
    const keyword = query?.search?.trim() || "";
    if(keyword){
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.$or = [{storeName:{$regex:`^${escaped}`,$options:"i"}}]
    }
    const vendorsPromise =  vendorModel.find(filter).select("storeName storeAdress storeLogo isApproved owner _id").populate("owner", "name email isBlocked").limit(limit).skip(offset).lean();
    const totalVendorsPromise = vendorModel.countDocuments(filter);
    const [vendors , totalVendors] = await Promise.all([vendorsPromise,totalVendorsPromise]);
    const totalPages = calcualteTotalPages(totalVendors,limit);
    return {vendors,totalPages};
}

export const productService = async(query)=>{
    const {offset,limit} = pagination(query?.pages || 1,query?.limit || 15);
    let filter = {};
    const keyword = query?.search?.trim() || "";
    if(keyword){
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.$or = [{name:{$regex:`${escaped}`,$options:"i"}}]
    }
    const productsPromise =  productModel.find(filter).select("name price images _id category vendor status quantity description isActive discount").populate("vendor", "storeName storeLogo").limit(limit).skip(offset).lean();
    const totalProductsPromise =  productModel.countDocuments(filter);
    const [products , totalProducts] = await Promise.all([productsPromise,totalProductsPromise]);
    const totalPages = calcualteTotalPages(totalProducts,limit);
    return {products,totalPages};
}

export const approveproductService = async (id)=>{
    const product = await productModel.findById(id).populate("vendor");
    if(!product) throw new AppError("Product does not exist",400);
    if(product.status === "approved") throw new AppError("Product is already approved",400);
    if(product.status === "out of stock") throw new AppError("Out-of-stock product cannot be approved",400);
    product.status = "approved";
    product.isActive = true;
    await product.save({validateBeforeSave:false});
    return product;
}
