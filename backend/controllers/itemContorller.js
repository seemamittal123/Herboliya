import mongoose from "mongoose";
import itemModel from "../models/itemModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, price, discription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadOnCloudinary(req.file.path);
    if (!imageUrl) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const item = await itemModel.create({
      name,
      image: imageUrl,
      price,
      discription,
    });

    return res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Add Item error",
      error: error.message,
    });
  }
};
export const getFoodItem = async (req, res) => {
  try {
    const items = await itemModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({
      message: "Get Item error",
      error: error.message,
    });
  }
};

export const editItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, discription } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const item = await itemModel.findByIdAndUpdate(
      { _id: id },
      { name, price, image, discription },
      { new: true },
    );
    if (!item) {
      return res.status(400).json({ message: "Item is not found" });
    }
    res.status(201).json({ message: "Item is Edited", item });
  } catch (error) {
    return res.status(201).json({ message: "Error in edit" });
  }
};

export const findItem = async (req, res) => {
  try {
    let id = req.params.id;
    const item = await itemModel.findById(id);
    if (!item) {
      return res.status(400).json({ message: "Item is not Found" });
    }
    return res.json({ item });
  } catch (error) {
    return res.status(500).json({ message: `Error : ${error}` });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const items = await itemModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Item deleted", items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.userId;
    const item = await itemModel.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "Item is not found" });
    }

    const alreadyLikedIndex = item.likes.findIndex((like) => {
      if (like && like.user) {
        return like.user.toString() === userId.toString();
      }
      return like.toString() === userId.toString();
    });

    if (alreadyLikedIndex !== -1) {
      item.likes.splice(alreadyLikedIndex, 1);
    } else {
      item.likes.push({ user: userId, likedAt: new Date() });
    }

    await item.save();
    res.json({
      liked: alreadyLikedIndex === -1,
      totalLikes: item.likes.length,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error : ${error}` });
  }
};

export const getLikesItem = async (req, res) => {
  try {
    const likedItems = await itemModel.aggregate([
      {
        $match: {
          $or: [
            { "likes.user": new mongoose.Types.ObjectId(req.userId) },
            { likes: new mongoose.Types.ObjectId(req.userId) },
          ],
        },
      },
      {
        $addFields: {
          myLike: {
            $filter: {
              input: "$likes",
              as: "like",
              cond: {
                $eq: ["$$like.user", new mongoose.Types.ObjectId(req.userId)],
              },
            },
          },
        },
      },
      {
        $addFields: {
          likedAt: { $arrayElemAt: ["$myLike.likedAt", 0] },
        },
      },
      {
        $sort: {
          likedAt: -1,
          createdAt: -1,
        },
      },
      {
        $project: {
          myLike: 0,
          likedAt: 0,
        },
      },
    ]);
    return res.status(200).json({ likedItems });
  } catch (error) {
    return res.status(500).json({
      message: "Get Item error",
      error: error.message,
    });
  }
};
