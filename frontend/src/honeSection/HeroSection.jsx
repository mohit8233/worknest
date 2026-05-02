import React from "react";

const HeroSection = ({
  searchTitle,
  setSearchTitle,
  searchLocation,
  setSearchLocation,
}) => {
  return (
    <section
      className="relative min-h-[520px] md:min-h-[600px] bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage:
          "url('https://as1.ftcdn.net/v2/jpg/02/58/55/00/1000_F_258550061_43hwStAIQf5bHwusnHDQ0AsaNgDP111w.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20"></div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl text-left text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Build Your Career with
              <span className="text-blue-400"> WorkNest</span>
            </h1>

            <p className="mt-5 text-lg md:text-xl text-white/90">
              Discover thousands of verified jobs from top companies across India.
            </p>

            <div className="mt-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-2xl shadow-2xl p-5 md:p-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Job title"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                />

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition">
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;