import express from "express";
import { markNotificationRead, myNotifications } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", protect, myNotifications);
router.patch("/read/:id", protect, markNotificationRead);

export default router;
