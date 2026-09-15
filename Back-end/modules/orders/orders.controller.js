import catchAsync from "../../utils/catchAsync.js";
import {makeOrderService, getMyOrdersService} from "./orders.service.js";

export const makeOrder = catchAsync(async(req,res,next)=>{
    const order = await makeOrderService(req.body,req.user._id);
    res.status(200).json({order,message:"Order placed successfully",Navigate:"/orders"})
})

export const getMyOrders = catchAsync(async(req,res,next)=>{
    const orders = await getMyOrdersService(req.user._id);
    res.status(200).json({orders,message:"Orders fetched successfully"});
})