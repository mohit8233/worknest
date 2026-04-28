import nodemailer from "nodemailer";
import path from "path";
import multer from "multer";
import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";
import { Notification } from "../models/notificationModel.js";

const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const sendApplicationEmail = async (application) => {
  const transporter = getTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Job Application - ${application.jobTitle}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
        <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
          <h2 style="color:#2563eb;margin-top:0">New Job Application</h2>
          <p><b>Job Title:</b> ${application.jobTitle}</p>
          <p><b>Company:</b> ${application.company}</p>
          <p><b>Name:</b> ${application.name}</p>
          <p><b>Email:</b> ${application.email}</p>
          <p><b>Phone:</b> ${application.phone}</p>
          <p><b>Resume:</b> <a href="${application.resume}">Open Resume</a></p>
          <p><b>Cover Letter:</b></p>
          <p>${application.coverLetter || "Not provided"}</p>
        </div>
      </div>
    `,
  });
};

const sendUserConfirmationEmail = async (application) => {
  const transporter = getTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: application.email,
    subject: `Application received - ${application.jobTitle}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
        <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
          <h2 style="color:#16a34a;margin-top:0">Application Submitted Successfully</h2>
          <p>Hi ${application.name},</p>
          <p>Your application for <b>${application.jobTitle}</b> at <b>${application.company}</b> has been received.</p>
          <p>Status: <b>Pending</b></p>
          <p>We will notify you when your status changes.</p>
          <p style="color:#64748b;font-size:13px">WorkNest Team</p>
        </div>
      </div>
    `,
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/resumes"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

export const resumeUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error("Only PDF, DOC and DOCX resumes are allowed"));
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: false, message: "Resume file is required" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/resumes/${req.file.filename}`;
    return res.status(200).json({ status: true, message: "Resume uploaded successfully", url: fileUrl });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Resume upload failed", error: error.message });
  }
};

export const applyJob = async (req, res) => {
  try {
    const { jobId, jobTitle, company, name, email, phone, resume, coverLetter } = req.body;

    if (!jobTitle || !company || !name || !email || !phone || !resume) {
      return res.status(400).json({ status: false, message: "All required fields are missing" });
    }

    let finalJobTitle = jobTitle;
    let finalCompany = company;

    if (jobId) {
      const job = await Job.findById(jobId);
      if (job) {
        finalJobTitle = job.title;
        finalCompany = job.company;
      }
    }

    const application = await Application.create({
      jobId: jobId || undefined,
      userId: req.user?._id,
      jobTitle: finalJobTitle,
      company: finalCompany,
      name,
      email,
      phone,
      resume,
      coverLetter,
    });

    if (req.user?._id) {
      await Notification.create({
        userId: req.user._id,
        title: "Application Submitted",
        message: `Your application for ${finalJobTitle} at ${finalCompany} was submitted successfully.`,
        type: "success",
      });
    }

    try {
      await sendApplicationEmail(application);
      await sendUserConfirmationEmail(application);
    } catch (emailError) {
      console.log("EMAIL ERROR:", emailError.message);
      console.log("FULL EMAIL ERROR:", emailError);

      return res.status(201).json({
        status: true,
        message: "Application saved, but email failed",
        data: application,
        emailError: emailError.message,
      });
    }

    return res.status(201).json({ status: true, message: "Application submitted successfully", data: application });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Application failed", error: error.message });
  }
};

export const myApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ status: true, data: applications });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Applications fetch failed", error: error.message });
  }
};

export const allApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("userId", "name email").sort({ createdAt: -1 });
    return res.status(200).json({ status: true, data: applications });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Applications fetch failed", error: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (status === "rejected") {
      const application = await Application.findByIdAndDelete(req.params.id);

      if (!application) {
        return res.status(404).json({ status: false, message: "Application not found" });
      }

      if (application.userId) {
        await Notification.create({
          userId: application.userId,
          title: "Application Rejected",
          message: `Your application for ${application.jobTitle} at ${application.company} was rejected.`,
          type: "danger",
        });
      }

      return res.status(200).json({ status: true, message: "Application rejected and deleted" });
    }

    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!application) {
      return res.status(404).json({ status: false, message: "Application not found" });
    }

    if (status === "selected" && application.userId) {
      await Notification.create({
        userId: application.userId,
        title: "Application Selected",
        message: `Congratulations! Your application for ${application.jobTitle} at ${application.company} was selected.`,
        type: "success",
      });
    }

    return res.status(200).json({ status: true, message: "Status updated", data: application });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Status update failed", error: error.message });
  }
};
