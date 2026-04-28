import React, { useState } from "react";

const faqs = [
  {
    question: "Is registration free?",
    answer: "Yes, registration is completely free for job seekers."
  },
  {
    question: "Can I apply for multiple jobs?",
    answer: "Yes, you can apply for unlimited jobs after creating your account."
  },
  {
    question: "How will I get interview updates?",
    answer: "You will receive updates via email from the company."
  },
  {
    question: "How long does the hiring process take?",
    answer: "It depends on the company, usually 1-3 weeks."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="theme-page py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 rounded-lg theme-card">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center"
            >
              {faq.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </button>

            {activeIndex === index && (
              <div className="px-6 pb-4 theme-muted">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;