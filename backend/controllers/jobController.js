import { Job } from "../models/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      logo,
      location,
      salary,
      category,
      type,
      description,
      requirements,
      lastDate,
      featured,
    } = req.body;

    if (!title || !company || !location || !salary || !description || !lastDate) {
      return res.status(400).json({
        status: false,
        message: "All required fields are missing",
      });
    }

    const job = await Job.create({
      title,
      company,
      logo,
      location,
      salary,
      category,
      type,
      description,
      requirements,
      lastDate,
      featured: featured === true || featured === "true",
      createdBy: req.user._id,
    });

    return res.status(201).json({
      status: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Job create failed",
      error: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const jobs = await Job.find({
      $or: [{ lastDate: { $gte: today } }, { lastDate: { $exists: false } }],
    }).sort({ featured: -1, createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "Jobs fetched",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Jobs fetch failed",
      error: error.message,
    });
  }
};

export const getFeaturedJobs = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const jobs = await Job.find({
      featured: true,
      $or: [{ lastDate: { $gte: today } }, { lastDate: { $exists: false } }],
    })
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      status: true,
      message: "Featured jobs fetched",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Featured jobs fetch failed",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.featured !== undefined) {
      payload.featured = payload.featured === true || payload.featured === "true";
    }

    if (payload.lastDate) {
      payload.lastDate = new Date(payload.lastDate);
    }

    const job = await Job.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Job update failed",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Job delete failed",
      error: error.message,
    });
  }
};