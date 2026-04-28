import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="w-full min-h-screen mt-11 bg-blue-50 flex items-center justify-center overflow-hidden px-6">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

       
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-12">
            Why we are different
          </h1>

          <p className="mt-4 theme-muted leading-relaxed">
            We collect reviews from our users so you can get an honest opinion of
            what an experience with our website.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8">

            {/* Item 1 */}
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-6 theme-card p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src="https://preview.colorlib.com/theme/joblab/assets/img/icon/icon1.svg"
                alt=""
                className="w-12 h-12"
              />
              <p className="text-slate-700 dark:text-slate-200">
                Keep your cool. Get on-demand help to make the best offer.
              </p>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-6 theme-card p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src="https://preview.colorlib.com/theme/joblab/assets/img/icon/icon2.svg"
                alt=""
                className="w-12 h-12"
              />
              <p className="text-slate-700 dark:text-slate-200">
                Keep your cool. Get on-demand help to make the best offer.
              </p>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-6 theme-card p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src="https://preview.colorlib.com/theme/joblab/assets/img/icon/icon3.svg"
                alt=""
                className="w-12 h-12"
              />
              <p className="text-slate-700 dark:text-slate-200">
                Keep your cool. Get on-demand help to make the best offer.
              </p>
            </motion.div>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://preview.colorlib.com/theme/joblab/assets/img/gallery/about1.png"
            alt=""
            className="max-w-full h-auto object-contain"
          />
        </motion.div>

      </div>
    </section>
  );
};



export default WhyChooseUs