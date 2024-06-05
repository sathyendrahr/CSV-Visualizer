import { addFile, getFiles } from "../models/file.repository.js";

export default class FileController {
  // Method to upload CSV file
  async uploadFile(req, res, next) {
    try {
      const files = await getFiles();

      if (!req.file) {
        return res.render("index", {
          files: files,
          errorMessage: "Please select a file",
        });
      }

      // Condition to check if uploaded file has .csv extension
      if (!req.file.filename.endsWith(".csv")) {
        return res.render("index", {
          files: files,
          errorMessage: "File must be a csv file",
        });
      }

      // Creating file document using uploaded file details from request
      const filename = req.file.filename;
      const file = {
        name: filename.substring(25),
        url: "uploads/" + filename,
      };

      await addFile(file);

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }

  async getFiles(req, res, next) {
    try {
      let errorMessage = null;
      if (req.query && req.query.fileError == "true") {
        errorMessage =
          "Oops! Seems like the file doesn't exist on server. Please upload again to view. Sorry for the inconvenience caused";
      }
      const files = await getFiles();
      res.render("index", { files, errorMessage: errorMessage });
    } catch (err) {
      next(err);
    }
  }
}
