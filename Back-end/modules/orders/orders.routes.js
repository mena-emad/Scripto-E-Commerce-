import express from "express";
import { makeOrder, getMyOrders } from "./orders.controller.js";
import {makeOrderValidation} from "./orders.validation.js";
import {protect} from "../../middlewares/auth.js";
import validation from "../../middlewares/validation.js";

const orderRouter = express.Router();

orderRouter.get("/my-orders",protect,getMyOrders)
orderRouter.post("/make-order",protect,validation(makeOrderValidation),makeOrder)

export default orderRouter

