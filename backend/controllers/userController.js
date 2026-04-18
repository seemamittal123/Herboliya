import userModel from "../models/userModel.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User id is not found" });
    }
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Get current user error" });
  }
};
