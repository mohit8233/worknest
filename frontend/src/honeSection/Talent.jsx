import React from "react";
import { motion } from "framer-motion";

const Talent = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-[85%] max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LEFT */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <motion.img
            src="https://preview.colorlib.com/theme/jobsco/assets/img/gallery/about.png"
            alt="Talent UI"
            className="w-full max-w-[420px]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1"
        >
          <h1 className="text-[42px] font-bold  leading-tight mb-5">
            We Build Lasting <br />
            Relationships <br />
            Between Candidates <br />
            & Businesses
          </h1>

          <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-7 max-w-[500px] mb-4">
            The automated process starts as soon as your clothes go into the
            machine. The outcome is gleaming clothes.
          </p>

          <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-7 max-w-[500px] mb-6">
            Automated process starts as soon as your clothes go into the
            machine.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 bg-blue-700 text-white font-semibold rounded-md mb-7"
          >
            FIND TALENT
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default Talent;
