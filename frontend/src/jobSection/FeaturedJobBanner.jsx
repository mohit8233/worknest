import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { getFeaturedJobs } from "../api/api";

const fallbackJob = {
  title: "Lead Frontend Developer",
  company: "CodeCraft Solutions",
  logo: "https://ui-avatars.com/api/?name=CodeCraft&background=7c3aed&color=fff",
  location: "Bangalore, India",
  salary: "₹8 - 14 LPA",
  type: "Full Time",
  category: "IT",
};

const ModernJobBanner = () => {
  const navigate = useNavigate();
  const [featuredJob, setFeaturedJob] = useState(fallbackJob);

  useEffect(() => {
    getFeaturedJobs()
      .then((res) => {
        const jobs = res.data.data || [];
        if (jobs.length > 0) setFeaturedJob(jobs[0]);
      })
      .catch(() => setFeaturedJob(fallbackJob));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 px-6 py-28 text-white">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-yellow-400 px-5 py-2 font-black text-slate-950">
            <FaStar /> Featured Job
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-white p-2 shadow-2xl">
              {featuredJob.logo ? <img src={featuredJob.logo} alt={featuredJob.company} className="h-full w-full rounded-2xl object-cover" /> : <FaBuilding className="text-4xl text-blue-600" />}
            </div>
            <div>
              <p className="text-lg font-bold text-blue-100">{featuredJob.company}</p>
              <p className="rounded-full bg-white/10 px-3 py-1 text-sm text-blue-100">{featuredJob.category}</p>
            </div>
          </div>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">{featuredJob.title}</h1>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><FaMapMarkerAlt /> {featuredJob.location}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><FaMoneyBillWave /> {featuredJob.salary}</span>
            <span className="rounded-full bg-white/10 px-4 py-2">{featuredJob.type}</span>
          </div>

          <button onClick={() => navigate("/jobSection")} className="mt-8 rounded-2xl bg-white px-8 py-4 font-black text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50">
            View & Apply
          </button>
        </div>

        <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur">
          <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80" alt="Featured job" className="h-[390px] w-full rounded-[1.5rem] object-cover" />
        </div>
      </div>
    </section>
  );
};

export default ModernJobBanner;
