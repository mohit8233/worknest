import React from 'react'
import  { useState, useEffect } from "react";

import {
  FaUserCircle,
  FaBriefcase,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);
     const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    });
    return ()=> unsubscribe()
  })

  useEffect(()=>{
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];


    setAppliedJobs(applied);
    setSavedJobs(saved);
  })

  const handleLogout = async ()=>{
    await signOut(auth);
  }

 return (
    <div className="min-h-screen flex theme-section-soft">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">WorkNest</h2>

          <ul className="space-y-5">
            {["dashboard", "profile", "jobs", "saved", "settings"].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer flex gap-2 items-center p-2 rounded capitalize
                ${
                  activeTab === tab
                    ? "bg-blue-600"
                    : "hover:text-blue-400"
                }`}
              >
                {tab === "dashboard" && <FaBriefcase />}
                {tab === "profile" && <FaUserCircle />}
                {tab === "jobs" && <FaBriefcase />}
                {tab === "saved" && <FaBookmark />}
                {tab === "settings" && <FaCog />}
                {tab}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>

          <Link to="/" className="text-sm text-slate-400 hover:text-white text-center block">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* TOPBAR */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>

          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img src={user.photoURL} className="w-10 h-10 rounded-full" />
            ) : (
              <FaUserCircle className="text-3xl" />
            )}
            <span>{user?.email}</span>
          </div>
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="theme-card p-6 rounded-xl shadow">
              <h3>Applied Jobs</h3>
              <p className="text-3xl font-bold">{appliedJobs.length}</p>
            </div>

            <div className="theme-card p-6 rounded-xl shadow">
              <h3>Saved Jobs</h3>
              <p className="text-3xl font-bold">{savedJobs.length}</p>
            </div>

            <div className="theme-card p-6 rounded-xl shadow">
              <h3>Profile Views</h3>
              <p className="text-3xl font-bold">10</p>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="theme-card p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">My Profile</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>User name</strong> {user?.name}</p>
          </div>
        )}

        {/* APPLIED JOBS */}
        {activeTab === "jobs" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>

            {appliedJobs.length === 0 ? (
              <p>No jobs applied yet 🚀</p>
            ) : (
              appliedJobs.map((job, i) => (
                <div key={i} className="theme-card p-5 rounded-xl shadow mb-4">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{job.company}</p>
                  <p className="text-blue-500 text-sm">Status: Applied</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* SAVED JOBS */}
        {activeTab === "saved" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Saved Jobs</h2>

            {savedJobs.length === 0 ? (
              <p>No saved jobs ⭐</p>
            ) : (
              savedJobs.map((job, i) => (
                <div key={i} className="theme-card p-5 rounded-xl shadow mb-4">
                  <h3>{job.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{job.company}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="theme-card p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-bold">Settings</h2>

            <input
              type="text"
              placeholder="Update Name"
              className="w-full p-2 border rounded"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
export default Dashboard