import express from "express";
import {protect, restrictTo} from "../../middlewares/auth.js";
import {
    statics,
    viewVendorDetails,
    viewUserDetails,
    viewProductDetails,
    approveVendor,
    users,
    vendors,
    products,
    approveProduct
} from "./admin.controller.js";

const adminRouter = express.Router();

adminRouter.use(protect);
adminRouter.use(restrictTo("admin"));

adminRouter.get("/statics", statics);
adminRouter.get("/vendor/:id", viewVendorDetails);
adminRouter.get("/user/:id", viewUserDetails);
adminRouter.get("/product/:id", viewProductDetails);
adminRouter.patch("/approve-vendor/:id", approveVendor);
adminRouter.get("/users", users);
adminRouter.get("/vendors", vendors);
adminRouter.get("/products", products);
adminRouter.patch("/approve-product/:id",approveProduct);

export default adminRouter;