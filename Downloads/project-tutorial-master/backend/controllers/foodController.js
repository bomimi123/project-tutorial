import fs from "fs";
import path from "path";
import foodModel from "../models/foodModel.js";

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(path.join("uploads", "images", food.image), () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Endpoint tìm kiếm live
const searchFood = async (req, res) => {
    try {
        const { q } = req.query; 

        if (!q || q.trim().length < 2) {
            return res.json({ success: true, data: [] });
        }

        const searchRegex = new RegExp(q, 'i');

        const searchResults = await foodModel.find({ 
            name: { $regex: searchRegex } 
        }).limit(8);

        res.json({ success: true, data: searchResults });

    } catch (error) {
        console.error("Error during live search:", error);
        res.json({ success: false, message: "Error in search logic" });
    }
}


export { addFood, listFood, removeFood, searchFood };
