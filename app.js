import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import FileController from "./src/controllers/file.controller.js";
import fileUpload from "./src/middlewares/fileupload.middleware.js";
import CSVController from "./src/controllers/csv.controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));

app.use("/[a-zA-Z0-9]+/view", express.static(path.resolve("public")));
app.use(express.static(path.resolve("public")));

// View Engine configuration
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Controller Objects
const fileController = new FileController();
const csvController = new CSVController();

// Routes
app.get("/", fileController.getFiles);
app.post("/upload", fileUpload.single("fileUpload"), fileController.uploadFile);

app.get("/:id/view", (req, res, next) =>
  csvController.viewFile(req, res, next)
);

export default app;
