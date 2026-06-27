import express from "express"
import { addToCart, updateProduct , removeFromCart,clearCart, getMyCart} from "./cart.controller.js"
import validation from "../../middlewares/validation.js"
import {protect} from "../../middlewares/auth.js"
import { cartJoi , removeFromCartJoi} from "./cart.validation.js"

const cartRouter = express.Router();
//======== add to cart routes =========
cartRouter.post("/add-to-cart",protect,validation(cartJoi),addToCart)
//======== update cart routes =========
cartRouter.patch("/update-product",protect,validation(cartJoi),updateProduct)
//======== delete cart routes =========
cartRouter.delete("/remove-from-cart",protect,validation(removeFromCartJoi),removeFromCart)

//======== clear cart routes =========
cartRouter.delete("/clear-cart",protect,clearCart)
//======== get cart routes =========
cartRouter.get("/get-my-cart",protect,getMyCart)

export default cartRouter