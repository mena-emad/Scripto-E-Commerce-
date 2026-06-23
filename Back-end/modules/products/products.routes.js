import express from "express"
import { createProduct, getProducts , updateProduct, deleteProduct} from "./products.controller.js"
import { productsJoi, updatedProductJoi } from "./products.validations.js"
import validation from "../../middlewares/validation.js"
import { allowGuest , protect, restrictTo, restrictToVendorApproved } from "../../middlewares/auth.js"
const productRouter = express.Router();
import upload from "../../utils/cloudinary.js"
// ========= create product routes =========
productRouter.post("/add-product",protect,restrictTo("vendor"),restrictToVendorApproved,upload.array("productImage"),validation(productsJoi),createProduct)
// ========= get product routes =========
productRouter.get("/get-products",allowGuest,getProducts)

//========== update product routes =========
productRouter.put("/update-product/:id",protect,restrictTo("vendor"),restrictToVendorApproved,upload.array("productImage"),validation(updatedProductJoi),updateProduct)

//======== delete product routes =========
productRouter.delete("/delete-product/:id",protect,restrictTo("vendor","admin"),restrictToVendorApproved,deleteProduct)

export default productRouter