import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { registerUser } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { notify } from "../utils/notify";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    registerUser(formData)
      .then((res) => {
        if (res.data.status) {
          login(res.data.user, res.data.token);
          notify.success(res.data.message);

          if (res.data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          notify.success(res.data.message);
        }
      })
      .catch((error) => {
        notify.error(error.response?.data?.message || "Signup failed");
      });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen px-4 theme-section-soft">
        <div className="theme-card p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Sign Up</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" className="w-full p-3 rounded-xl bg-blue-50 text-slate-900 outline-none dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="w-full p-3 rounded-xl bg-blue-50 text-slate-900 outline-none dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" className="w-full p-3 rounded-xl bg-blue-50 text-slate-900 outline-none dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500" value={formData.password} onChange={handleChange} required />

            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 rounded-xl bg-blue-50 text-slate-900 outline-none dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 font-semibold">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 text-sm dark:text-gray-300">
            Already have an account?
            <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer ml-1 font-semibold">
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
