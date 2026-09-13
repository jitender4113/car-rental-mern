import React from 'react'
import { motion } from 'motion/react'

const Newsletter = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="px-6 md:px-16 lg:px-24 xl:px-44 my-20 mb-32"
        >

            <div className="relative overflow-hidden rounded-[28px] bg-[#eef5f1] border border-[#dce9e2]">

                {/* Decorative circles */}
                <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-emerald-900/5" />
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border border-emerald-900/5" />

                <div className="absolute -left-24 -bottom-28 w-72 h-72 rounded-full bg-emerald-900/[0.03] blur-2xl" />


                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 md:py-16">

                    {/* Small label */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <span className="w-8 h-px bg-emerald-700/50" />

                        <span className="text-emerald-800 text-[10px] md:text-xs font-semibold tracking-[0.2em]">
                            RV TRAVEL INSIDER
                        </span>

                        <span className="w-8 h-px bg-emerald-700/50" />
                    </motion.div>


                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-[#17211d] text-3xl md:text-4xl font-semibold tracking-tight"
                    >
                        Never Miss a Great
                        <span className="text-emerald-700"> Adventure</span>
                    </motion.h1>


                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-gray-500 text-sm md:text-base mt-4 max-w-xl leading-6"
                    >
                        Get exclusive RV deals, new listings and inspiring
                        road-trip ideas delivered straight to your inbox.
                    </motion.p>


                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center max-w-xl w-full h-14 mt-8 bg-white rounded-xl p-1.5 shadow-sm border border-gray-200"
                    >

                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                            className="flex-1 h-full px-4 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400 min-w-0"
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="h-full px-5 md:px-8 rounded-lg bg-[#123c32] hover:bg-[#0d3028] text-white text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
                        >
                            Subscribe
                        </motion.button>

                    </motion.form>


                    {/* Bottom note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-[11px] mt-4"
                    >
                        Exclusive offers · New RVs · Travel inspiration
                    </motion.p>

                </div>

            </div>

        </motion.section>
    )
}

export default Newsletter