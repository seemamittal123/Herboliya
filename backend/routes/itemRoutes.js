import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  addItem,
  editItem,
  findItem,
  getFoodItem,
  deleteItem,
  toggleLike,
  getLikesItem,
} from "../controllers/itemContorller.js";
const itemRoutes = express.Router();

itemRoutes.post("/add-item", isAuth, upload.single("image"), addItem);
itemRoutes.get("/get-items",  getFoodItem);
itemRoutes.get("/find-item/:id", findItem);
itemRoutes.post("/edit-item/:id", isAuth, upload.single("image"), editItem);
itemRoutes.delete("/delete-item/:id", isAuth, deleteItem);
itemRoutes.post("/like/:itemId", isAuth, toggleLike);
itemRoutes.get("/likes", isAuth, getLikesItem);
export default itemRoutes;
