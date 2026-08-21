import express from "express";

import {
    getMyProducts,
    getMyOrders,
    getOrderDetails,
    updateOrderStatus,
    getMyProfile,
    updateMyProfile,
    getDashboardStats,
    getProductsStats,
    getRecentOrders
} from "./vendor.controller.js";

import vendorUpdateProfileJoi from "./vendor.validations.js";

import {
    protect,
    restrictToVendorApproved
} from "../../middlewares/auth.js";

import validation from "../../middlewares/validation.js";


const vendorRouter = express.Router();


// ==================== Vendor Middleware ====================

vendorRouter.use(
    protect,
    restrictToVendorApproved
);


// ==================== Profile ====================

vendorRouter.get(
    "/profile",
    getMyProfile
);

vendorRouter.patch(
    "/profile",
    validation(vendorUpdateProfileJoi),
    updateMyProfile
);


// ==================== Products ====================

vendorRouter.get(
    "/products",
    getMyProducts
);


// ==================== Orders ====================

vendorRouter.get(
    "/orders",
    getMyOrders
);

vendorRouter.get(
    "/orders/:orderId",
    getOrderDetails
);

vendorRouter.patch(
    "/orders/:orderId/status",
    updateOrderStatus
);


// ==================== Dashboard ====================

vendorRouter.get(
    "/dashboard/stats",
    getDashboardStats
);

vendorRouter.get(
    "/dashboard/products/stats",
    getProductsStats
);

vendorRouter.get(
    "/dashboard/orders/recent",
    getRecentOrders
);


export default vendorRouter;