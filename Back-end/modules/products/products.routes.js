import express from "express"
import { createProduct, getProducts , updateProduct, deleteProduct, toggleProductActive} from "./products.controller.js"
import { productsJoi, updatedProductJoi } from "./products.validations.js"
import validation from "../../middlewares/validation.js"
import { allowGuest , protect, restrictTo, restrictToVendorApproved, restrictToVendorApprovedOrAdmin } from "../../middlewares/auth.js"
const productRouter = express.Router();
import upload from "../../utils/cloudinary.js"
// ========= get product routes =========
productRouter.get("/get-products",allowGuest,getProducts)
// ========= create product routes =========
productRouter.post("/add-product",protect,restrictTo("vendor"),restrictToVendorApproved,upload.array("productImage",5),validation(productsJoi),createProduct)

//========== update product routes =========
productRouter.put("/update-product/:id",protect,restrictTo("vendor"),restrictToVendorApproved,upload.array("productImage"),validation(updatedProductJoi),updateProduct)

//======== delete product routes =========
productRouter.delete("/delete-product/:id",protect,restrictTo("vendor","admin"),restrictToVendorApprovedOrAdmin,deleteProduct)
productRouter.patch("/toggle-active/:id",protect,restrictTo("admin"),toggleProductActive)

export default productRouter