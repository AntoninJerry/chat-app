import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to mongoDB: ${conn.connection.host}` );
    } catch (error) {
        console.log(`g`, error);
    }
};