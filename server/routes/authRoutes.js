import express from "express";
import {
  googleAuth,
  logOut,
  resetPassword,
  sendOtp,
  signIn,
  signUp,
  VerifyOtp,
  VerifySignUpOtp,
} from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);
authRoute.get("/log-out", logOut);
authRoute.post("/send-otp", sendOtp);
authRoute.post("/verify-otp", VerifyOtp);
authRoute.post("/verify-sign-up-otp", VerifySignUpOtp);
authRoute.post("/reset-password", resetPassword);
authRoute.post("/google-auth", googleAuth);

export default authRoute;
