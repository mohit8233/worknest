import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loginUser } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { notify } from "../utils/notify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(formData)
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
        notify.error(error.response?.data?.message || "Login failed");
      });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen px-4 theme-section-soft">
        <div className="theme-card p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-slate-900 dark:text-white dark:text-white">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-blue-50 text-slate-900 outline-none dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-blue-50 text-slate-900 outline-none dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="w-full bg-blue-600 p-3 rounded-xl hover:bg-blue-700 text-white font-semibold">
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm dark:text-gray-300">
            New user?
            <span onClick={() => navigate("/signup")} className="text-blue-600 cursor-pointer ml-1 font-semibold">
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
