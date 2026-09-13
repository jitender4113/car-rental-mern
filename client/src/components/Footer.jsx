import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-32 bg-[#102c25] text-white"
        >

            <div className="px-6 md:px-16 lg:px-24 xl:px-32">

                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 py-16 md:py-20">

                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >

                        <Link to="/">
                            <motion.img
                                whileHover={{ scale: 1.03 }}
                                src={assets.logo}
                                alt="Caravan Rental"
                                className="h-9 brightness-0 invert"
                            />
                        </Link>

                        <p className="max-w-md mt-5 text-white/55 text-sm leading-7">
                            Discover a better way to travel. Rent unique caravans
                            and RVs from trusted owners and turn every road into
                            an unforgettable adventure.
                        </p>


                        {/* Social */}
                        <div className="flex items-center gap-3 mt-7">

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                            >
                                <img
                                    src={assets.instagram_logo}
                                    className="w-4 h-4 brightness-0 invert opacity-70"
                                    alt="Instagram"
                                />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                            >
                                <img
                                    src={assets.facebook_logo}
                                    className="w-4 h-4 brightness-0 invert opacity-70"
                                    alt="Facebook"
                                />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                            >
                                <img
                                    src={assets.twitter_logo}
                                    className="w-4 h-4 brightness-0 invert opacity-70"
                                    alt="Twitter"
                                />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                            >
                                <img
                                    src={assets.gmail_logo}
                                    className="w-4 h-4 brightness-0 invert opacity-70"
                                    alt="Email"
                                />
                            </a>

                        </div>

                    </motion.div>


                    {/* Explore */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >

                        <h2 className="text-sm font-semibold text-white tracking-wide">
                            EXPLORE
                        </h2>

                        <ul className="mt-5 flex flex-col gap-3 text-sm text-white/50">

                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-white transition-colors"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/cars"
                                    className="hover:text-white transition-colors"
                                >
                                    Browse RVs
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/my-bookings"
                                    className="hover:text-white transition-colors"
                                >
                                    My Bookings
                                </Link>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    About Us
                                </a>
                            </li>

                        </ul>

                    </motion.div>


                    {/* For Owners */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >

                        <h2 className="text-sm font-semibold text-white tracking-wide">
                            FOR OWNERS
                        </h2>

                        <ul className="mt-5 flex flex-col gap-3 text-sm text-white/50">

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    List Your RV
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    How It Works
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Owner Protection
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>

                        </ul>

                    </motion.div>

                </div>


                {/* Contact Strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="border-t border-white/10 border-b py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                >

                    <div>
                        <p className="text-[10px] tracking-[0.2em] text-[#c6a15b] font-semibold">
                            HAVE A QUESTION?
                        </p>

                        <p className="text-white/70 text-sm mt-2">
                            We're here to help you plan your next journey.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 text-sm">

                        <span className="text-white/55">
                            info@example.com
                        </span>

                        <span className="hidden sm:block text-white/20">
                            |
                        </span>

                        <span className="text-white/55">
                            +1 234 567 890
                        </span>

                    </div>

                </motion.div>


                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-white/35">

                    <p>
                        © {new Date().getFullYear()} Caravan Rental. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">

                        <a href="#" className="hover:text-white/70 transition-colors">
                            Privacy
                        </a>

                        <span>•</span>

                        <a href="#" className="hover:text-white/70 transition-colors">
                            Terms
                        </a>

                        <span>•</span>

                        <a href="#" className="hover:text-white/70 transition-colors">
                            Cookies
                        </a>

                    </div>

                </div>

            </div>

        </motion.footer>
    )
}

export default Footer