import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "adimn"],
      default: "user",
    },

    deliveryAddress: {
      name: { type: String },
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    resetOtp: {
      type: String,
    },
    isOtpVerified: {
      type: Boolean,
    },
    otpExpires: {
      type: Date,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
