import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getOrder,
  placeOrder,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller.js";
const orderRoute = express.Router();

orderRoute.post("/place-order", isAuth, placeOrder);
orderRoute.get("/my-orders", isAuth, getOrder);
orderRoute.post("/update-status/:orderId", isAuth, updateOrderStatus);
orderRoute.delete("/cancel-order/:id", isAuth, cancelOrder);
export default orderRoute;
