import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.ClOUD_API_KEY,         
  api_secret: process.env.CLOUD_SECRET_API_KEY,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      throw new Error("File does not exist on server");
    }

    const result = await cloudinary.uploader.upload(filePath);

    fs.unlinkSync(filePath);
    return result.secure_url;

  } catch (error) {
    console.error("Cloudinary upload error:", error.message);

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error; 
  }
};

export default uploadOnCloudinary;
