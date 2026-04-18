import mongoose from "mongoose";
const ItemsSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true },
);
const orderScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payment: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },
    deliveryAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    totalAmount: {
      type: Number,
    },
    items: [ItemsSchema],
    status: {
      type: String,
      enum: ["pending", "delivered", "preparing", "out of delivery"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const order = mongoose.model("Order", orderScheme);
export default order;
