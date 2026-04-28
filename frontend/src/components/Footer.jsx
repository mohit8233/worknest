import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t ">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

                {/* Left Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white">Work<span className="text-blue-600">Nest</span></h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        WorkNest is a modern job portal designed to connect talented
                        professionals with top companies. Find your dream job quickly
                        and efficiently with our smart search system.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition">
                            <FaInstagram />
                        </a>
                        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-500 transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Middle Section */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Useful Links
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="hover:text-white cursor-pointer transition">Home</li>
                        <li className="hover:text-white cursor-pointer transition">Browse Jobs</li>
                        <li className="hover:text-white cursor-pointer transition">Post a Job</li>
                        <li className="hover:text-white cursor-pointer transition">About Us</li>
                        <li className="hover:text-white cursor-pointer transition">Contact</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Subscribe Newsletter
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Get the latest job updates and career tips delivered straight to your inbox.
                    </p>

                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-slate-800 dark:text-slate-100"
                        />
                        <button className="bg-blue-600 px-4 py-2 rounded-r-lg text-white hover:bg-blue-700 transition">
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                © {new Date().getFullYear()} WorkNest. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;