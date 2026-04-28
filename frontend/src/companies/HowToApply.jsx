import React from "react";

const steps = [
  {
    id: 1,
    title: "Create Your Account",
    desc: "Sign up and complete your profile with skills and experience.",
  },
  {
    id: 2,
    title: "Search Your Dream Job",
    desc: "Browse jobs by category, company, or location.",
  },
  {
    id: 3,
    title: "Apply with One Click",
    desc: "Submit your application quickly using our easy apply system.",
  },
  {
    id: 4,
    title: "Get Interview Call",
    desc: "If shortlisted, companies will contact you directly.",
  },
];

const HowToApply = () => {
  return (
    <section className="theme-page py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">How To Apply</h2>
        <p className="theme-muted mb-12">
          Follow these simple steps to apply for your dream job.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="theme-card p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="theme-muted text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToApply;