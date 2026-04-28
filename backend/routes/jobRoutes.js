import express from "express";
import { createJob, deleteJob, getFeaturedJobs, getJobs, updateJob } from "../controllers/jobController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/featured", getFeaturedJobs);
router.post("/create", protect, adminOnly, createJob);
router.patch("/update/:id", protect, adminOnly, updateJob);
router.delete("/delete/:id", protect, adminOnly, deleteJob);

export default router;
