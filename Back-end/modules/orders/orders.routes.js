import express from "express";
import { makeOrder } from "./orders.controller.js";
import {makeOrderValidation} from "./orders.validation.js";
import {protect} from "../../middlewares/auth.js";
import validation from "../../middlewares/validation.js";

const orderRouter = express.Router();

orderRouter.post("/make-order",protect,validation(makeOrderValidation),makeOrder)

export default orderRouter

