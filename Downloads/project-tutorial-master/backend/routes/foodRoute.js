import express from "express";
import { addFood, listFood, removeFood, searchFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: "uploads/images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/search", searchFood);

export default foodRouter;
