import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    logo: { type: String, default: "" },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    category: { type: String, default: "IT" },
    type: { type: String, default: "Full Time" },
    description: { type: String, required: true },
    requirements: { type: String },
    expireDate: {
      type: Date,
      required: true
    },
    featured: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
