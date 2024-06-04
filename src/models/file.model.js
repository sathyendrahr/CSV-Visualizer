import mongoose from "mongoose";

// Database is used to store the file records, it is not necessary to use database in this project
const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
});

const fileModel = mongoose.model("File", fileSchema);

export default fileModel;
