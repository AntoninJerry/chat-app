import express from  "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  
}));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
    console.log("server is running on port:" + PORT);
    connectDB();
});
