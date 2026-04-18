import order from "../models/orderModel.js";
import userModel from "../models/userModel.js";
export const placeOrder = async (req, res) => {
  try {
    const { cartItem, deliveryAddress, payMentMethod, totalAmount } = req.body;
    if (!cartItem || cartItem.length == 0) {
      return res.status(400).json({ message: "CartItem is required" });
    }
    if (!deliveryAddress) {
      return res
        .status(400)
        .json({ message: "Send Complete Delvivery address" });
    }

    const Order = await order.create({
      user: req.userId,
      payment: payMentMethod,
      deliveryAddress,
      totalAmount,
      items: cartItem.map((i) => ({
        item: i._id,
        image: i.image,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    });

    let user = await userModel.findById(req.userId);
    user.deliveryAddress = deliveryAddress;
    await user.save();

    return res
      .status(201)
      .json({ message: "Order is successfully placed", Order });
  } catch (error) {
    return res.status(500).json({ message: `place order error ${error}` });
  }
};

export const getOrder = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    let orders;
    if (user.role == "user") {
      orders = await order
        .find({ user: req.userId })
        .populate("user")
        .sort({ createdAt: -1 });
    } else {
      orders = await order.find().populate("user").sort({ createdAt: -1 });
    }
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: `Error : ${error}` });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const Order = await order.findById(orderId);
    if (!Order) {
      return res.status(404).json({ message: "Order not found" });
    }
    Order.status = status;
    await Order.save();

    return res.status(200).json({ order: Order });
  } catch (error) {
    return res.status(500).json({ message: `Error ${error}` });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await order.findByIdAndDelete(id);
    return res.status(200).json({ message: "Order is cancel" });
  } catch (error) {
    return res.status(500).json({ message: `error : ${error}` });
  }
};
