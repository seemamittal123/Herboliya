import userModel from "../models/userModel.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
