import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersFroSidebar } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",protectRoute, getUsersFroSidebar);
router.get("/:id", protectRoute, getMessages);


export default router;

