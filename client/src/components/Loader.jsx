import React from 'react'
import { motion } from 'motion/react'

const Loader = () => {
    return (
        <div className="
            flex
            flex-col
            justify-center
            items-center
            h-[80vh]
            bg-[#fafbf9]
        ">

            {/* Loader */}
            <div className="relative w-14 h-14">

                {/* Outer ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    className="
                        absolute
                        inset-0
                        rounded-full
                        border-[3px]
                        border-[#dce8e2]
                        border-t-[#123c32]
                    "
                />

                {/* Center */}
                <div className="
                    absolute
                    inset-2
                    rounded-full
                    bg-[#eef5f1]
                    flex
                    items-center
                    justify-center
                    text-[#c6a15b]
                    text-sm
                ">
                    ✦
                </div>

            </div>


            {/* Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="
                    mt-5
                    text-xs
                    font-medium
                    tracking-[0.15em]
                    uppercase
                    text-gray-400
                "
            >
                Finding your RV
            </motion.p>

        </div>
    )
}

export default Loader