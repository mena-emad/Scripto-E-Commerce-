import catchAsync from "../../utils/catchAsync.js";

import {
    vendorProductService,
    vendorOrderService,
    vendorProfileService,
    vendorDashboardService
} from "./vendor.service.js";

// ==================== Product ====================

export const getMyProducts = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;

    const products = await vendorProductService.getMyProduct(vendorId);

    res.status(200).json({
        success: true,
        products
    });
});


// ==================== Orders ====================

export const getMyOrders = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;

    const orders = await vendorOrderService.getMyOrders(vendorId);

    res.status(200).json({
        success: true,
        orders
    });
});


export const getOrderDetails = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;
    const { orderId } = req.params;

    const order = await vendorOrderService.getOrderDetails(
        orderId,
        vendorId
    );

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order does not exist"
        });
    }

    res.status(200).json({
        success: true,
        order
    });
});


export const updateOrderStatus = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;
    const { orderId } = req.params;
    const { status } = req.body;

    await vendorOrderService.updateOrdersStatus(
        orderId,
        vendorId,
        status
    );

    res.status(200).json({
        success: true,
        message: "Order status updated successfully"
    });
});


// ==================== Profile ====================

export const getMyProfile = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;

    const vendor = await vendorProfileService.getMyProfile(vendorId);

    res.status(200).json({
        success: true,
        vendor
    });
});


export const updateMyProfile = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;

    const vendor = await vendorProfileService.updateVendorProfile(
        vendorId,
        req.body,
        req.file
    );

    res.status(200).json({
        success: true,
        message: "Vendor profile updated successfully",
        vendor
    });
});


// ==================== Dashboard ====================

export const getDashboardStats = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;

    const stats = await vendorDashboardService.getDashboardStats(vendorId);

    res.status(200).json({
        success: true,
        stats
    });
});


export const getProductsStats = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;

    const stats = await vendorDashboardService.getProductsSatas(vendorId);

    res.status(200).json({
        success: true,
        stats
    });
});


export const getRecentOrders = catchAsync(async (req, res) => {
    const vendorId = req.vendor._id;

    const result = await vendorDashboardService.getRecentOrders(
        vendorId,
        req.query
    );

    res.status(200).json({
        success: true,
        ...result
    });
});