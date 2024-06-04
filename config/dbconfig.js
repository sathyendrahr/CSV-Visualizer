import mongoose from "mongoose";

const url = process.env.DB_URL || "mongodb://localhost:27017/csvviewer";

// Configuration for remote mongoDB servers like mongoDB Atlas
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectToDatabase = () => {
  try {
    mongoose.connect(url, clientOptions);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

export default connectToDatabase;
