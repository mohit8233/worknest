import React from "react";
import { useState } from "react";
import { notify } from "../utils/notify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    notify.success("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="theme-page">

      {/* 1️⃣ Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 text-center px-6">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Have questions? We'd love to hear from you.
        </p>
      </section>

      {/* 2️⃣ Contact Info Cards */}
      <section className="py-16 theme-section px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="theme-page p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">📍 Address</h3>
            <p>Ahmedabad, Gujarat, India</p>
          </div>

          <div className="theme-page p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">📧 Email</h3>
            <p>support@jobportal.com</p>
          </div>

          <div className="theme-page p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>

        </div>
      </section>

      {/* 3️⃣ Contact Form */}
      <section className="py-20 theme-section-soft px-6">
        <div className="max-w-4xl mx-auto theme-card p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-lg"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </section>

      {/* 4️⃣ Map Section */}
      <section className="py-16 theme-section px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Location
        </h2>

        <div className="max-w-5xl mx-auto">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            className="w-full h-96 rounded-xl"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* 5️⃣ Quick Help */}
      <section className="py-16 theme-section-soft text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Need Quick Help?
        </h2>
        <p className="theme-muted">
          Check our FAQ section or email us directly.
        </p>
      </section>

      {/* 6️⃣ CTA Section */}
      <section className="bg-indigo-600 text-white py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          We're Here to Help You
        </h2>
        <p className="mb-8">
          Reach out anytime and we’ll get back to you as soon as possible.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Back to Home
        </button>
      </section>

    </div>
  );
};

export default ContactUs;