import { useContext, useEffect, useState } from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegClock,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApplyForm from "../components/ApplyForm";
import { AuthContext } from "../context/AuthContext";
import { deleteJob, getJobs } from "../api/api";

const fallbackJobs = [
  {
    _id: "demo1",
    title: "Senior React Developer",
    company: "TechVision Pvt Ltd",
    logo: "https://ui-avatars.com/api/?name=TechVision&background=2563eb&color=fff",
    location: "Ahmedabad, India",
    salary: "₹6 - 10 LPA",
    type: "Full Time",
    category: "IT",
    description: "Build modern React dashboards and reusable UI systems.",
    date: "2026-05-20",
  },
  {
    _id: "demo2",
    title: "Frontend Developer",
    company: "CodeCraft Solutions",
    logo: "https://ui-avatars.com/api/?name=CodeCraft&background=7c3aed&color=fff",
    location: "Mumbai, India",
    salary: "₹4 - 7 LPA",
    type: "Full Time",
    category: "IT",
    description: "Create responsive, fast and beautiful web experiences.",
    date: "2026-05-25",
  },
  {
    _id: "demo3",
    title: "Backend Developer",
    company: "DataSoft Tech",
    logo: "https://ui-avatars.com/api/?name=DataSoft&background=059669&color=fff",
    location: "Bangalore, India",
    salary: "₹5 - 9 LPA",
    type: "Full Time",
    category: "IT",
    description: "Develop APIs, authentication and MongoDB powered services.",
    date: "2026-06-01",
  },
  {
    _id: "demo4",
    title: "UI/UX Designer",
    company: "Creative Minds",
    logo: "https://ui-avatars.com/api/?name=Creative&background=ea580c&color=fff",
    location: "Pune, India",
    salary: "₹3 - 6 LPA",
    type: "Full Time",
    category: "Creative",
    description: "Design clean product screens and user friendly flows.",
    date: "2026-05-15",
  },
];

const JobSection = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsData, setJobsData] = useState([]);

  const fetchJobs = () => {
    getJobs()
      .then((res) => {
        const apiJobs = res.data.data || [];
        setJobsData(apiJobs.length > 0 ? apiJobs : fallbackJobs);
      })
      .catch(() => setJobsData(fallbackJobs));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const activeJobs = jobsData.filter((job) => {
    if (!job.date) return true;

    const today = new Date();
    const expireDate = new Date(job.date);

    today.setHours(0, 0, 0, 0);
    expireDate.setHours(23, 59, 59, 999);

    return expireDate >= today;
  });

  const handleApply = (job) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedJob(job);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    deleteJob(id)
      .then((res) => {
        alert(res.data.message);
        fetchJobs();
      })
      .catch((error) =>
        alert(error.response?.data?.message || "Job delete failed")
      );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-5 py-14 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            Latest Opportunities
          </span>

          <h1 className="mt-5 text-4xl font-black text-slate-950 dark:text-white md:text-5xl">
            All Available Jobs
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Admin-created jobs are loaded from MongoDB and shown here with the
            same card style for users and admins.
          </p>
        </div>

        {activeJobs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              No active jobs available
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              All jobs are expired right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {activeJobs.map((job) => (
              <div
                key={job._id || job.id}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 theme-card p-6 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl theme-section-soft shadow-inner dark:bg-slate-800">
                      {job.logo ? (
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FaBuilding className="text-3xl text-blue-600" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900 dark:text-white">
                        {job.company}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Expires on {job.date || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {job.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-4 py-2 text-xs font-bold text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                        <FaStar /> Featured
                      </span>
                    )}

                    <span className="rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {job.category}
                    </span>
                  </div>
                </div>

                <h2 className="mb-4 text-2xl font-black leading-snug text-slate-950 dark:text-white">
                  {job.title}
                </h2>

                <p className="mb-5 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {job.description}
                </p>

                <div className="space-y-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <FaMapMarkerAlt className="text-blue-600" /> {job.location}
                  </p>

                  <p className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <FaRegClock className="text-emerald-600" /> {job.type}
                  </p>

                  <p className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <FaMoneyBillWave className="text-amber-600" /> {job.salary}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  {user?.role === "admin" ? (
                    <>
                      <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="flex-1 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="rounded-2xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-green-200 dark:hover:shadow-green-950"
                      onClick={() => handleApply(job)}
                    >
                      Apply Now →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </section>
  );
};

export default JobSection;