import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sonnh2607:bomimi123@cluster0.prbulje.mongodb.net/', {
            dbName: 'test'  
        });
        console.log("DB Connected.");
    } catch (error) {
        console.error("DB Connection Error: ", error);
        process.exit(1); 
    }
};
