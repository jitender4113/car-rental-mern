import React from 'react'
import { motion } from 'motion/react'

const Title = ({ title, subTitle }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-2"
        >

            {/* Small luxury accent */}
            <div className="flex items-center gap-3 mb-4">

                <span className="w-8 h-[2px] bg-[#c6a15b]" />

                <span className="
                    text-[10px]
                    md:text-xs
                    font-semibold
                    tracking-[0.2em]
                    uppercase
                    text-[#123c32]
                ">
                    Discover
                </span>

            </div>


            {/* Heading */}
            <h1 className="
                text-[#17211d]
                text-3xl
                md:text-4xl
                lg:text-[42px]
                font-semibold
                tracking-[-0.025em]
                leading-tight
            ">
                {title}
            </h1>


            {/* Description */}
            <p className="
                text-sm
                md:text-base
                text-gray-500
                mt-3
                max-w-[620px]
                leading-7
            ">
                {subTitle}
            </p>

        </motion.div>
    )
}

export default Title