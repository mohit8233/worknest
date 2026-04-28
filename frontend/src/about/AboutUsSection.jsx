import React from "react";
import { useNavigate } from "react-router-dom";

const team = [
  { id: 1, name: "Mohit Singh", role: "Founder & Full Stack Developer", img: "https://via.placeholder.com/150" },
  { id: 2, name: "Aarav Patel", role: "Backend Developer", img: "https://via.placeholder.com/150" },
  { id: 3, name: "Sneha Sharma", role: "HR Manager", img: "https://via.placeholder.com/150" },
  { id: 4, name: "Riya Verma", role: "UI/UX Designer", img: "https://via.placeholder.com/150" },
];

const AboutUsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="theme-page">

      {/* 1️⃣ Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 text-center px-6">
        <h1 className="text-5xl font-bold mb-6">About Our Job Portal</h1>
        <p className="max-w-3xl mx-auto text-lg">
          We are building a bridge between talented job seekers and top companies.
          Our platform is designed to make hiring simple, fast, and transparent.
        </p>
      </section>

      {/* 2️⃣ Stats Section */}
      <section className="py-20 theme-section">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center px-6">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p>Hiring Companies</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">10,000+</h3>
            <p>Active Jobs</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">25,000+</h3>
            <p>Registered Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </section>

      {/* 3️⃣ Our Story */}
      <section className="py-20 px-6 theme-section-soft">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Story</h2>
          <p className="theme-muted text-lg leading-relaxed">
            Our journey started with a simple idea — to make job searching easier.
            Many talented candidates struggle to find the right opportunity,
            and companies struggle to find the right talent. We created this
            platform to solve that gap and simplify recruitment for everyone.
          </p>
        </div>
      </section>

      {/* 4️⃣ Mission & Vision */}
      <section className="py-20 theme-section px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="theme-page p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
            <p className="theme-muted">
              To empower job seekers and help companies hire faster through
              technology-driven recruitment solutions.
            </p>
          </div>

          <div className="theme-page p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h3>
            <p className="theme-muted">
              To become India's most trusted and user-friendly job portal.
            </p>
          </div>
        </div>
      </section>

      {/* 5️⃣ Core Values */}
      <section className="py-20 theme-section-soft px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="theme-card p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">Transparency</h3>
            <p>We believe in clear communication and honest hiring.</p>
          </div>

          <div className="theme-card p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">Innovation</h3>
            <p>We continuously improve our platform with new technologies.</p>
          </div>

          <div className="theme-card p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">User First</h3>
            <p>Our users are at the center of everything we build.</p>
          </div>
        </div>
      </section>

      {/* 6️⃣ Why Choose Us */}
      <section className="py-20 theme-section px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="max-w-5xl mx-auto space-y-6 text-lg theme-muted">
          <p>✔ Easy and quick job application process</p>
          <p>✔ Verified companies and job listings</p>
          <p>✔ Secure and user-friendly platform</p>
          <p>✔ Fast hiring and real-time updates</p>
        </div>
      </section>

      {/* 7️⃣ Team Section */}
      <section className="py-20 theme-section-soft px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="theme-card p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8️⃣ CTA Section */}
      <section className="bg-indigo-600 text-white py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Find Your Dream Job?
        </h2>
        <button
          onClick={() => navigate("/jobs")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Explore Jobs
        </button>
      </section>

    </div>
  );
};

export default AboutUsSection;