import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const getJobs = () => API.get("/jobs");
export const getFeaturedJobs = () => API.get("/jobs/featured");
export const createJob = (data) => API.post("/jobs/create", data);
export const updateJob = (id, data) => API.patch(`/jobs/update/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/delete/${id}`);

export const uploadResumeApi = (data) => API.post("/applications/upload-resume", data, { headers: { "Content-Type": "multipart/form-data" } });
export const applyJobApi = (data) => API.post("/applications/apply", data);
export const getMyApplications = () => API.get("/applications/my");
export const getAllApplications = () => API.get("/applications/all");
export const updateApplicationStatus = (id, data) => API.patch(`/applications/status/${id}`, data);
export const getMyNotifications = () => API.get("/notifications/my");
export const markNotificationRead = (id) => API.patch(`/notifications/read/${id}`);

export default API;
