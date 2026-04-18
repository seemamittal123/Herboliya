import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";
const userRoute = express.Router();

userRoute.get("/current", isAuth, getCurrentUser);

export default userRoute;
