import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import getToken from "../utils/token.js";
import { sendSignUpOtpmail } from "../utils/mail.js";
import { sendOtpmail } from "../utils/mail.js";
export const signUp = async (req, res) => {
  try {
    const { fullname, email, phoneNo, password } = req.body;
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user is already exist" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 character" });
    }
    if (!phoneNo) {
      return res.status(400).json({ message: "Phone Numberis required" });
    }
    if (phoneNo.length < 10) {
      return res
        .status(400)
        .json({ message: "Modile Number must be at least 10 digits" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
      phoneNo,
      resetOtp: otp,
      deliveryAddress: {
        name: "",
        phone: phoneNo,
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
    });
    await sendSignUpOtpmail(email, otp);

    return res.status(201).json({ message: "OTP is successfully send", user });
  } catch (err) {
    return res.status(400).json({ message: `Error in sign up ${err}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user is not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 31 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({ message: "Sign in successfully", user });
  } catch (err) {
    return res.status(400).json({ message: `Sign in error ` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Log out successfully" });
  } catch (error) {
    return res.status(400).json({ message: `Log out error` });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist " });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpmail(email, otp);
    return res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Otp is not Sent" });
  }
};

export const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.resetOtp != otp) {
      return res.status(400).json({ message: "invalid otp" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Otp is expired" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Otp is verifed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Otp is not verified" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist " });
    }
    if (!newpassword) {
      return res.status(400).json({ message: "New password is required" });
    }
    if (newpassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be 6 character" });
    }
    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "Otp verification is requied" });
    }
    const hashPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res
      .status(200)
      .json({ message: "password is successfully changed" });
  } catch (error) {
    return res.status(500).json({ message: "Password is not change" });
  }
};

export const VerifySignUpOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.resetOtp != otp) {
      return res.status(400).json({ message: "invalid otp" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Otp is expired" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 31 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await user.save();
    return res.status(200).json({ message: "Otp is verifed" });
  } catch (error) {
    return res.status(500).json({ message: "Otp is not verified" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullname, email, phoneNo } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) {
      if (!phoneNo) {
        return res.status(400).json({ message: "Modile number is required" });
      }
      user = await userModel.create({ fullname, email, phoneNo });
    }
    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 31 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ message: "Google authantication is successful", user });
  } catch (error) {
    return res.status(500).json({ message: `Error in google authantication` });
  }
};
