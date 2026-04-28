import { useContext, useEffect, useState } from "react";
import { FaBriefcase, FaCheckCircle, FaClock, FaEnvelope, FaIdBadge, FaTimesCircle, FaUserCircle } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AuthContext } from "../../context/AuthContext";
import { getMyApplications } from "../../api/api";
import NotificationPanel from "../../components/NotificationPanel";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    getMyApplications()
      .then((res) => setApplications(res.data.data || []))
      .catch((error) => alert(error.response?.data?.message || "Applications fetch failed"));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const selected = applications.filter((app) => app.status === "selected").length;
  const pending = applications.filter((app) => app.status === "pending").length;

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 dark:text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-950 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100"><FaIdBadge /> User Profile</p>
                <h1 className="text-4xl font-black md:text-5xl">Welcome, {user?.name}</h1>
                <p className="mt-3 max-w-2xl text-blue-100">Track your job applications and profile details in one clean dashboard.</p>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <FaUserCircle className="text-6xl text-blue-100" />
                <div>
                  <p className="text-xl font-black">{user?.name}</p>
                  <p className="flex items-center gap-2 text-sm text-blue-100"><FaEnvelope /> {user?.email}</p>
                  <span className="mt-2 inline-block rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-100">{user?.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaBriefcase className="text-3xl text-blue-600" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Total Applied</p><h2 className="text-4xl font-black">{applications.length}</h2></div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaClock className="text-3xl text-amber-500" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Pending</p><h2 className="text-4xl font-black">{pending}</h2></div>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"><FaCheckCircle className="text-3xl text-emerald-600" /><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Selected</p><h2 className="text-4xl font-black">{selected}</h2></div>
          </div>

          <div className="mb-8">
            <NotificationPanel />
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <div className="border-b border-slate-200 p-6 dark:border-slate-700"><h2 className="text-2xl font-black">My Applications</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="theme-section-soft text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                  <tr><th className="p-4">Job</th><th className="p-4">Company</th><th className="p-4">Status</th><th className="p-4">Applied Date</th></tr>
                </thead>
                <tbody>
                  {applications.length > 0 ? applications.map((app) => (
                    <tr key={app._id} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-4 font-bold">{app.jobTitle}</td>
                      <td className="p-4">{app.company}</td>
                      <td className="p-4"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold capitalize ${app.status === "selected" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{app.status === "selected" ? <FaCheckCircle /> : <FaClock />} {app.status}</span></td>
                      <td className="p-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="p-8 text-center text-slate-500">No applications yet</td></tr>
                  )}
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

export default UserDashboard;
