import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">
        Ready to Start Your Career?
      </h2>
      <p className="mb-8 text-lg">
        Create your profile and apply for your dream job today.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Create Account
        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
        >
          Browse Jobs
        </button>
      </div>
    </section>
  );
};

export default CTASection;