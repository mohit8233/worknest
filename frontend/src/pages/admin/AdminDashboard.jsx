import { useContext, useEffect, useState } from "react";
import { FaBriefcase, FaBuilding, FaChartLine, FaCheckCircle, FaClock, FaEnvelope, FaMapMarkerAlt, FaStar, FaUserShield } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AuthContext } from "../../context/AuthContext";
import {
  createJob,
  deleteJob,
  getAllApplications,
  getJobs,
  updateApplicationStatus,
  updateJob,
} from "../../api/api";
import { notify } from "../../utils/notify";

const emptyJob = {
  title: "",
  company: "",
  logo: "",
  location: "",
  salary: "",
  category: "IT",
  type: "Full Time",
  description: "",
  requirements: "",
  expireDate: "",
  featured: false,
};

const inputClass = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState(emptyJob);
  const [editId, setEditId] = useState(null);

  const fetchJobs = () => {
    getJobs()
      .then((res) => setJobs(res.data.data || []))
      .catch((error) => alert(error.response?.data?.message || "Jobs fetch failed"));
  };

  const fetchApplications = () => {
    getAllApplications()
      .then((res) => setApplications(res.data.data || []))
      .catch((error) => alert(error.response?.data?.message || "Applications fetch failed"));
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = editId ? updateJob(editId, formData) : createJob(formData);

    request
      .then((res) => {
        alert(res.data.message);
        setFormData(emptyJob);
        setEditId(null);
        fetchJobs();
      })
      .catch((error) => alert(error.response?.data?.message || "Job save failed"));
  };

  const handleEdit = (job) => {
    setEditId(job._id);
    setFormData({
      title: job.title || "",
      company: job.company || "",
      logo: job.logo || "",
      location: job.location || "",
      salary: job.salary || "",
      category: job.category || "IT",
      type: job.type || "Full Time",
      description: job.description || "",
      requirements: job.requirements || "",
      expireDate: job.expireDate || "",
      featured: Boolean(job.featured),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    deleteJob(id)
      .then((res) => {
        notify.success(res.data.message);
        fetchJobs();
      })
      .catch((error) => notify.error(error.response?.data?.message || "Job delete failed"));
  };

  const handleStatus = (id, status) => {
    updateApplicationStatus(id, { status })
      .then((res) => {
        notify.success(res.data.message);
        fetchApplications();
      })
      .catch((error) => notify.error(error.response?.data?.message || "Status update failed"));
  };

  const pending = applications.filter((app) => app.status === "pending").length;
  const selected = applications.filter((app) => app.status === "selected").length;
  const featuredJobs = jobs.filter((job) => job.featured).length;
  const selectionRate = applications.length ? Math.round((selected / applications.length) * 100) : 0;

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 dark:text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100"><FaUserShield /> Admin Control Panel</p>
                <h1 className="text-4xl font-black md:text-5xl">Welcome, {user?.name || "Admin"}</h1>
                <p className="mt-3 max-w-2xl text-blue-100">Create jobs, manage applications, and control your WorkNest hiring flow from one place.</p>
              </div>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-blue-100">Admin Email</p>
                <p className="mt-1 flex items-center gap-2 font-semibold"><FaEnvelope /> {user?.email}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-5 md:grid-cols-5">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaBriefcase className="text-3xl text-blue-600" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Total Jobs</p><h2 className="text-4xl font-black">{jobs.length}</h2></div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaBuilding className="text-3xl text-indigo-600" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Applications</p><h2 className="text-4xl font-black">{applications.length}</h2></div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaClock className="text-3xl text-amber-500" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Pending</p><h2 className="text-4xl font-black">{pending}</h2></div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaCheckCircle className="text-3xl text-emerald-600" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Selected</p><h2 className="text-4xl font-black">{selected}</h2></div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaStar className="text-3xl text-yellow-500" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Featured Jobs</p><h2 className="text-4xl font-black">{featuredJobs}</h2></div>
          </div>

          <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <div className="mb-5 flex items-center gap-3">
              <FaChartLine className="text-3xl text-blue-600" />
              <div>
                <h2 className="text-2xl font-black">Admin Analytics</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Quick hiring overview based on current jobs and applications.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl theme-section-soft p-5 dark:bg-slate-950"><p className="text-sm font-bold text-slate-500">Selection Rate</p><h3 className="mt-2 text-3xl font-black text-emerald-600">{selectionRate}%</h3></div>
              <div className="rounded-3xl theme-section-soft p-5 dark:bg-slate-950"><p className="text-sm font-bold text-slate-500">Avg Applications / Job</p><h3 className="mt-2 text-3xl font-black text-blue-600">{jobs.length ? (applications.length / jobs.length).toFixed(1) : 0}</h3></div>
              <div className="rounded-3xl theme-section-soft p-5 dark:bg-slate-950"><p className="text-sm font-bold text-slate-500">Active Hiring</p><h3 className="mt-2 text-3xl font-black text-indigo-600">{jobs.length}</h3></div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
              <h2 className="mb-5 text-2xl font-black">{editId ? "Update Job" : "Create New Job"}</h2>
              <div className="space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" className={inputClass} required />
                <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className={inputClass} required />
                <input name="logo" value={formData.logo} onChange={handleChange} placeholder="Company Logo URL" className={inputClass} />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className={inputClass} required />
                <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" className={inputClass} required />
                <div className="grid grid-cols-2 gap-3">
                  <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                    <option>IT</option><option>Creative</option><option>Marketing</option><option>Corporate</option><option>Finance</option><option>Medical</option>
                  </select>
                  <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
                    <option>Full Time</option><option>Part Time</option><option>Remote</option><option>Internship</option>
                  </select>
                </div>
                <input name="expireDate" value={formData.expireDate} onChange={handleChange} placeholder="Last Date" className={inputClass} />
                <label className="flex items-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 font-bold text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-200">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-5 w-5" />
                  Mark as Featured Job
                </label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className={`${inputClass} min-h-28`} required />
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements" className={`${inputClass} min-h-24`} />
                <button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-blue-200 dark:hover:shadow-blue-950">{editId ? "Update Job" : "Create Job"}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setFormData(emptyJob); }} className="w-full rounded-2xl bg-slate-700 py-3 font-bold text-white">Cancel Edit</button>}
              </div>
            </form>

            <div className="lg:col-span-2 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
              <h2 className="mb-5 text-2xl font-black">All Jobs</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {jobs.length > 0 ? jobs.map((job) => (
                  <div key={job._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-950">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow dark:bg-slate-800">
                        {job.logo ? <img src={job.logo} alt={job.company} className="h-full w-full object-cover" /> : <FaBuilding className="text-2xl text-blue-600" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-black">{job.title}</h3>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{job.company}</p>
                        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400"><FaMapMarkerAlt /> {job.location}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                      {job.featured && <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">Featured</span>}
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">{job.category}</span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">{job.type}</span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">{job.salary}</span>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <button onClick={() => handleEdit(job)} className="flex-1 rounded-xl bg-amber-500 px-4 py-2 font-bold text-white transition hover:bg-amber-600">Edit</button>
                      <button onClick={() => handleDelete(job._id)} className="flex-1 rounded-xl bg-red-500 px-4 py-2 font-bold text-white transition hover:bg-red-600">Delete</button>
                    </div>
                  </div>
                )) : <p className="rounded-2xl theme-section-soft p-6 text-center text-slate-500 dark:bg-slate-950 dark:text-slate-400 md:col-span-2">No jobs created yet</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <div className="border-b border-slate-200 p-6 dark:border-slate-700"><h2 className="text-2xl font-black">All Applications</h2><p className="text-sm text-slate-500 dark:text-slate-400">Rejected select karte hi application database aur UI dono se delete ho jayegi.</p></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="theme-section-soft text-slate-600 dark:bg-slate-950 dark:text-slate-300"><tr><th className="p-4">Candidate</th><th className="p-4">Job</th><th className="p-4">Contact</th><th className="p-4">Resume</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
                <tbody>
                  {applications.length > 0 ? applications.map((app) => (
                    <tr key={app._id} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-4 font-bold">{app.name}</td>
                      <td className="p-4">{app.jobTitle}</td>
                      <td className="p-4"><p>{app.email}</p><p className="text-slate-500">{app.phone}</p></td>
                      <td className="p-4"><a href={app.resume} target="_blank" rel="noreferrer" className="font-bold text-blue-600 underline">Open</a></td>
                      <td className="p-4"><span className="rounded-full bg-blue-100 px-3 py-1 font-bold capitalize text-blue-700">{app.status}</span></td>
                      <td className="p-4">
                        <select value={app.status} onChange={(e) => handleStatus(app._id, e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                          <option value="pending">Pending</option>
                          <option value="selected">Selected</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="6" className="p-8 text-center text-slate-500">No applications yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminDashboard;
