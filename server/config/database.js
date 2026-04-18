import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://seemamittal528_db_user:HbLNR4By20J9soy6@cluster0.pozlkyp.mongodb.net/HerboliyaDB"
  );
};

export default connectDB;
