import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sonnh2266:lmht_proson1@cluster0.h6lujy0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
}
