import { useContext, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaBriefcase,
  FaUserCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const dashboardLink = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";

  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 border-b-2 border-blue-400 pb-1"
      : "hover:text-blue-400";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-blue-900/20 bg-blue-950/95 text-white shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-950/95">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <FaBriefcase className="text-2xl" />
            <span className="text-2xl font-bold">
              Work<span className="text-blue-500">Nest</span>
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-8 font-medium">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={navClass}>
              Jobs
            </NavLink>
            <NavLink to="/companies" className={navClass}>
              Companies
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>

            {!user ? (
              <NavLink to="/login" className="hover:text-blue-400">
                Login
              </NavLink>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink
                  to={dashboardLink}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20 hover:text-blue-400"
                >
                  <FaUserCircle className="text-2xl" />
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {user && (
              <NavLink
                to={dashboardLink}
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                <FaUserCircle className="text-3xl" />
              </NavLink>
            )}

            <button
              className="text-2xl text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="md:hidden px-6 py-6 shadow-lg bg-blue-950 text-slate-200 dark:bg-slate-950 dark:text-white flex flex-col gap-5">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={navClass}>
            Home
          </NavLink>
          <NavLink to="/jobs" onClick={() => setMenuOpen(false)} className={navClass}>
            Jobs
          </NavLink>
          <NavLink
            to="/companies"
            onClick={() => setMenuOpen(false)}
            className={navClass}
          >
            Companies
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={navClass}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={navClass}
          >
            Contact
          </NavLink>

          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 text-left font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Header;