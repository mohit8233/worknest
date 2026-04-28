import React, { useContext, useState } from "react";
import category from "../Data/categories";
import ApplyForm from "../components/ApplyForm";
import { useNavigate } from "react-router-dom";
import withUpcomingHighlight from "../hoc/withUpcomingHighlight";
import { AuthContext } from "../context/AuthContext";

const categoryColors = {
  Creative: "bg-pink-100 text-pink-600",
  IT: "bg-indigo-100 text-indigo-600",
  Marketing: "bg-yellow-100 text-yellow-600",
  Corporate: "theme-section-soft text-slate-700 dark:text-slate-200",
  Finance: "bg-green-100 text-green-600",
  Medical: "bg-red-100 text-red-600",
  Upcoming: "bg-red-100 text-red-600",
  All: "bg-blue-100 text-blue-600",
};

const companyLogos = {
  "Globe Solution Ltd.":
    "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo1.svg",
  "AdWorld Pvt Ltd":
    "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo2.svg",
  TechSoft:
    "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo3.svg",
  PeopleCorp:
    "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo5.svg",
  FinEdge:
    "http://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo2.svg",
  DesignPro: "https://www.svgrepo.com/show/508699/building.svg",
  "PixelCraft Studio":
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
};

const getExpireDate = (job) => {
  return job.expireDate || job.expiryDate || job.deadline || job.validTill || job.date;
};

const isJobActive = (job) => {
  const expireValue = getExpireDate(job);

  if (!expireValue) return true;

  const today = new Date();
  const expireDate = new Date(expireValue);

  if (isNaN(expireDate.getTime())) return true;

  today.setHours(0, 0, 0, 0);
  expireDate.setHours(23, 59, 59, 999);

  return expireDate >= today;
};

const JobCard = ({ job, handleApply, isUpcoming }) => {
  const expireValue = getExpireDate(job);

  return (
    <div
      className={`rounded-2xl p-7 transition ${
        isUpcoming ? "bg-transparent" : "theme-card hover:shadow-xl"
      }`}
    >
      <span
        className={`mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold ${
          categoryColors[job.category] || "theme-section-soft text-slate-600"
        }`}
      >
        {job.category}
      </span>

      <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
        {job.title}
      </h3>

      <div className="mb-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
      </div>

      {expireValue && (
        <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Active Till: {new Date(expireValue).toLocaleDateString()}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <img
            src={
              companyLogos[job.company] ||
              "https://www.svgrepo.com/show/508699/building.svg"
            }
            alt={job.company}
            className="h-6 w-6 object-contain"
          />

          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {job.company}
          </span>
        </div>

        <span className="text-xs text-slate-400">{job.time}</span>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          onClick={() => handleApply(job)}
        >
          Apply →
        </button>
      </div>
    </div>
  );
};

const HighlightedCard = withUpcomingHighlight(JobCard);

const JobGrid = ({ searchTitle = "", searchLocation = "", jobsData = [] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleApply = (job) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setSelectedJob(job);
  };

  const filteredJobs = jobsData.filter((job) => {
    const matchesCategory =
      activeCategory === "All" || job.category === activeCategory;

    const matchesTitle = (job.title || "")
      .toLowerCase()
      .includes(searchTitle.toLowerCase());

    const matchesLocation = (job.location || "")
      .toLowerCase()
      .includes(searchLocation.toLowerCase());

    return matchesCategory && matchesTitle && matchesLocation && isJobActive(job);
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 dark:text-white">
        Find Jobs By Category
      </h2>

      <div className="mb-14 flex flex-wrap justify-center gap-6 border-b border-slate-200 dark:border-slate-700">
        {category.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-4 text-lg font-semibold transition ${
              activeCategory === cat
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-400 hover:text-slate-700 dark:text-slate-200 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <HighlightedCard
              key={job._id || job.id}
              job={job}
              handleApply={handleApply}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg font-semibold text-slate-500 dark:text-slate-400">
            No active jobs found 😔
          </p>
        )}
      </div>

      {selectedJob && (
        <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </section>
  );
};

export default JobGrid;