import React from "react";

// Example company data

const companies = [
  { id: 1, name: "TechVision", logo: "https://img.icons8.com/?size=128&id=Yg2F0VrvISOC&format=png" },
  { id: 2, name: "CodeCraft", logo: "https://img.icons8.com/?size=96&id=gYRR6rys6REq&format=png" },
  { id: 3, name: "InnovateX", logo: "https://img.icons8.com/?size=96&id=80168&format=png" },
  { id: 4, name: "DesignStudio", logo: "https://img.icons8.com/?size=80&id=yNafvZl3uLck&format=png" },
  { id: 5, name: "NextGen Tech", logo: "https://img.icons8.com/?size=100&id=C1DUEYn7PMsS&format=png" },
  { id: 6, name: "Smart Solutions", logo: "https://img.icons8.com/?size=100&id=V3r2kWDPwZgQ&format=png" },
  { id: 7, name: "Bright Labs", logo: "https://img.icons8.com/?size=100&id=97726&format=png" },
  { id: 8, name: "FutureWorks", logo: "https://img.icons8.com/?size=128&id=Yg2F0VrvISOC&format=png" },
  { id: 9, name: "AlphaTech", logo: "https://img.icons8.com/?size=96&id=7bKLognUSdDj&format=png" },
  { id: 10, name: "BlueWave", logo: "https://img.icons8.com/?size=100&id=WdvNU85TbUGt&format=png" },
  { id: 11, name: "PixelPros", logo: "https://img.icons8.com/?size=100&id=X8t9nq1Y9xhF&format=png" },
  { id: 12, name: "QuantumSoft", logo: "https://img.icons8.com/?size=96&id=by7K6EO4PeHT&format=png" },
];



const TopHiringCompanies = () => {
  return (
    <section className="py-20 theme-page px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Top Hiring Companies
      </h2>

      {/* Fixed Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex flex-col items-center text-center theme-card p-4 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-20 h-20 object-contain p-2 rounded-full mb-2 
             bg-white dark:bg-white"
            />
            <p className="text-slate-700 dark:text-slate-200 font-semibold">{company.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopHiringCompanies;