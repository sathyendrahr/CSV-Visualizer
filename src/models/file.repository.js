import fileModel from "./file.model.js";

export const getFiles = async () => {
  return await fileModel.find();
};

export const addFile = async (file) => {
  return await fileModel.create(file);
};

export const getFileById = async (id) => {
  return await fileModel.findById(id);
};
