import express from "express";
import {protect, restrictTo} from "../middlewares/auth.js";
import {
    statics,
    viewVendorDetails,
    viewUserDetails,
    viewProductDetails,
    approveVendor,
    users,
    vendors,
    products
} from "./admin.controller.js";

const adminRouter = express.Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/statics", statics);
router.get("/vendor/:id", viewVendorDetails);
router.get("/user/:id", viewUserDetails);
router.get("/product/:id", viewProductDetails);
router.put("/approve-vendor/:id", approveVendor);
router.get("/users", users);
router.get("/vendors", vendors);
router.get("/products", products);

export default adminRouter;