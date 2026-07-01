import { useContext, useState } from "react";
import { applyJobApi, uploadResumeApi } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { notify } from "../utils/notify";
const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const ApplyForm = ({ job, onClose }) => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendApplication = (e) => {
    e.preventDefault();

    if (!resumeFile && !formData.resume) {
      notify.error("Please upload resume or paste resume link");
      return;
    }

    setLoading(true);

    const submitApplication = (resumeUrl) => {
      const payload = {
        jobId: job?._id,
        jobTitle: job?.title,
        company: job?.company,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume: resumeUrl,
        coverLetter: formData.coverLetter,
      };

      console.log("FINAL PAYLOAD:", payload);

      return applyJobApi(payload);
    };

    const request = resumeFile
      ? (() => {
          const data = new FormData();
          data.append("resume", resumeFile);

          return uploadResumeApi(data).then((res) => {
            console.log("UPLOAD RESPONSE:", res.data);

            const uploadedUrl = res.data?.url;

            if (!uploadedUrl) {
              throw new Error("Resume upload url not found");
            }

            return submitApplication(uploadedUrl);
          });
        })()
      : submitApplication(formData.resume);

    request
      .then((res) => {
        console.log("APPLY SUCCESS:", res.data);
        notify.success(res.data?.message || "Application submitted successfully");
        onClose();
      })
      .catch((error) => {
        console.log("APPLY FULL ERROR:", error.response?.data || error.message);

        notify.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Failed to submit application"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <form
        onSubmit={sendApplication}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-white/70 theme-card p-6 text-slate-900 shadow-2xl dark:text-white"
      >
        <div className="mb-5 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white">
          <h2 className="text-2xl font-black">
            Apply for {job?.title}
          </h2>
          <p className="text-sm text-blue-100">{job?.company}</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className={fieldClass}
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className={fieldClass}
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            className={fieldClass}
            value={formData.phone}
            onChange={handleChange}
          />

          <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-4">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Upload Resume File
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                setResumeFile(e.target.files?.[0] || null);
              }}
              className="w-full text-sm text-slate-800"
            />

            <p className="mt-2 text-xs text-slate-500">
              PDF, DOC, DOCX allowed. Max 5MB.
            </p>
          </div>

          <input
            type="text"
            name="resume"
            placeholder="Or paste Resume Link"
            className={fieldClass}
            value={formData.resume}
            onChange={handleChange}
            required={!resumeFile}
          />

          <textarea
            name="coverLetter"
            placeholder="Cover Letter"
            className={`${fieldClass} min-h-28`}
            value={formData.coverLetter}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-2xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full font-bold text-red-500"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;