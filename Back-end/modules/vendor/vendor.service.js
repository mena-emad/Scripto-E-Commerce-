import AppError from "../../utils/AppError.js";
import productModel from "../../data/models/Product.js";
import { subOrderModel , parentOrderModel } from "../../data/models/Orders.js";
import vendorModel from "../../data/models/Vendor.js";
import uploadToCloudinary from "../../utils/cloudinary.js";
import {pagination,calcualteTotalPages} from "../../utils/pagination.js";

class VenodrProductService {

    async getMyProduct(vendorId){
        return  await productModel.find({vendor:vendorId}).lean();
    }

}

class VendorOrderService {
    async updateParentOrderStatus(parentOrderId){
        const orders = await subOrderModel.find({parentOrder:parentOrderId}).select("status").lean();
        if(orders.length === 0) return;
        const allDelivered = orders.every(order => order.status === "Delivered");
        const allCancelled = orders.every(order => order.status === "Cancelled");
        const anyShipped = orders.some(order => order.status === "Shipped");
        const anyProcessing = orders.some(order => order.status === "Processing");
        let globalStatus;
        if(allDelivered) globalStatus = "Delivered";
        else if(allCancelled) globalStatus = "Cancelled";
        else if(anyShipped) globalStatus = "Shipped";
        else if(anyProcessing) globalStatus = "Processing";
        else globalStatus = "Pending";
        await parentOrderModel.findOneAndUpdate({_id:parentOrderId},{$set:{globalStatus}});
    }
    async getMyOrders(vendorId){
        return  await subOrderModel.find({vendor:vendorId}).populate("product").lean();
    }
    async getOrderDetails(orderId,vendorId){
        return  await subOrderModel.findOne({vendor:vendorId,_id:orderId}).populate("product").lean();
    }

    async updateOrdersStatus(orderId,vendorId,status){
        const order = await subOrderModel.findOne({vendor:vendorId,_id:orderId});
        if(!order) throw new AppError("Order does not exist",400);
        order.status = status;
        await order.save({validateBeforeSave:false});
        await this.updateParentOrderStatus(order.parentOrder);
    }
}

class VendorProfileService{
    async getMyProfile(vendorId){
        const vendor = await vendorModel.findById(vendorId).lean();
        if(!vendor) throw new AppError("Vendor does not exist",400);
        return vendor;
    }

    async updateVendorProfile(vendorId,data,file){
        const updatedData = {}
        if(data.storeName?.trim()) updatedData.storeName = data.storeName.trim();
        if(data.storeAdress?.trim()) updatedData.storeAdress = data.storeAdress.trim();
        if(data.storePhone?.trim()) updatedData.storePhone = data.storePhone.trim();
        if(data.storeDescription?.trim()) updatedData.storeDescription = data.storeDescription.trim();
        if(data.storeEmail?.trim()) updatedData.storeEmail = data.storeEmail.trim();
        if(file){
            const image = await uploadToCloudinary(file.buffer);
            if(image) {
                updatedData.storeLogo = {
                    url:image.url,
                    public_id:image.public_id
                }
            }
        }

        const vendor = await vendorModel.findByIdAndUpdate({_id:vendorId},{$set:updatedData},{new:true , runValidators:true});

        if(!vendor) throw new AppError("Vendor does not exist",400);

    }
}

class VendorDashboardService {
    async getDashboardStats(vendorId){
        const totalOrdersPromise = subOrderModel.countDocuments({vendor:vendorId});
        const totalDeliveredPromise = subOrderModel.countDocuments({vendor:vendorId, status:"Delivered"});
        const totalShippedPromise = subOrderModel.countDocuments({vendor:vendorId, status:"Shipped"});
        const totalProcessingPromise = subOrderModel.countDocuments({vendor:vendorId, status:"Processing"});
        const totalCancelledPromise = subOrderModel.countDocuments({vendor:vendorId, status:"Cancelled"});
        const totalPendingPromise = subOrderModel.countDocuments({vendor:vendorId, status:"Pending"});
        const totalRevenuePromise = subOrderModel.aggregate([
            {$match:{vendor:vendorId,status:"Delivered"}},
            {
                $group:{
                    _id:null,
                
                    totalRevenue:{$sum:"$totalPrice"}
                }
            }
        ])
        const [totalOrders,totalRevenueArr , totalDelivered , totalShipped , totalProcessing , totalCancelled , totalPending] = await Promise.all([totalOrdersPromise,totalRevenuePromise ,totalDeliveredPromise,totalShippedPromise,totalProcessingPromise,totalCancelledPromise,totalPendingPromise]);
        const totalRevenue = totalRevenueArr[0]?.totalRevenue || 0
        return {
            totalOrders,
            totalDelivered,
            totalShipped,
            totalProcessing,
            totalCancelled,
            totalPending,
            totalRevenue
        }
    }

    async getProductsSatas(vendorId){
        const totalProductsPromise = productModel.countDocuments({vendor:vendorId});
        const totalApprovedProductsPromise = productModel.countDocuments({vendor:vendorId,isApproved:true});
        const totalPendingProductsPromise = productModel.countDocuments({vendor:vendorId,isApproved:false});
        const [totalProducts,totalApprovedProducts , totalPendingProducts] = await Promise.all([totalProductsPromise,totalApprovedProductsPromise,totalPendingProductsPromise]);
        return {
            totalProducts,
            totalApprovedProducts,
            totalPendingProducts
        }
    }

    async getRecentOrders(vendorId,query){
        const {offset , limit } = pagination(query?.pages || 1,query?.limit || 15);
        const ordersPromise =  subOrderModel.find({vendor:vendorId}).populate("product").skip(offset).limit(limit).sort({createdAt:-1}).lean();
        const totalOrdersPromise =  subOrderModel.countDocuments({vendor:vendorId});
        const [orders , totalOrders] = await Promise.all([ordersPromise,totalOrdersPromise]);
        const orderPages = calcualteTotalPages(totalOrders,limit);
        return {orders,orderPages};  
    }
}

export const vendorOrderService = new VendorOrderService();
export const vendorProfileService = new VendorProfileService();
export const vendorDashboardService = new VendorDashboardService();
export const vendorProductService = new VenodrProductService();
