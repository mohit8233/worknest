import express from "express";
import { allApplications, applyJob, myApplications, resumeUpload, updateApplicationStatus, uploadResume } from "../controllers/applicationController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload-resume", protect, resumeUpload.single("resume"), uploadResume);
router.post("/apply", protect, applyJob);
router.get("/my", protect, myApplications);
router.get("/all", protect, adminOnly, allApplications);
router.patch("/status/:id", protect, adminOnly, updateApplicationStatus);

export default router;
