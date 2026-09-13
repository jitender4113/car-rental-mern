import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    const handleListRV = () => {
        navigate('/owner/add-car')
        window.scrollTo(0, 0)
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
                relative
                max-w-6xl
                mx-4
                md:mx-auto
                mt-20
                rounded-[28px]
                overflow-hidden
                bg-[#09231f]
                shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            "
        >

            {/* Background Glow */}
            <div
                className="
                    absolute
                    -top-32
                    -right-32
                    w-96
                    h-96
                    rounded-full
                    bg-emerald-400/20
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    -bottom-40
                    -left-20
                    w-80
                    h-80
                    rounded-full
                    bg-teal-400/10
                    blur-3xl
                "
            />


            {/* RV Background Image */}
            <div className="absolute inset-0">

                <img
                    src={assets.banner_car_image}
                    alt="Caravan"
                    className="
                        absolute
                        right-0
                        bottom-0
                        h-full
                        w-full
                        md:w-[58%]
                        object-cover
                        object-center
                    "
                />

                {/* Left Image Fade */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[#09231f]
                        via-[#09231f]/85
                        md:via-[#09231f]/60
                        to-transparent
                    "
                />

                {/* Bottom Fade */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#09231f]/70
                        via-transparent
                        to-transparent
                    "
                />

            </div>


            {/* Main Content */}
            <div
                className="
                    relative
                    z-10
                    px-7
                    py-10
                    md:px-12
                    md:py-12
                    lg:py-14
                    min-h-[390px]
                    md:min-h-[360px]
                    flex
                    items-center
                "
            >

                <div className="max-w-[540px] text-white">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-full
                            bg-white/10
                            border
                            border-white/15
                            backdrop-blur-sm
                            text-xs
                            font-semibold
                            tracking-wide
                            mb-5
                        "
                    >

                        <span className="text-emerald-300">
                            ✦
                        </span>

                        TURN YOUR RV INTO INCOME

                    </motion.div>


                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="
                            text-3xl
                            md:text-4xl
                            lg:text-5xl
                            font-bold
                            leading-tight
                        "
                    >

                        Have an RV
                        <br />

                        <span className="text-emerald-300">
                            sitting unused?
                        </span>

                    </motion.h2>


                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="
                            mt-4
                            text-white/75
                            text-sm
                            md:text-base
                            leading-relaxed
                            max-w-[460px]
                        "
                    >

                        Turn your caravan or RV into a source of income.
                        List your vehicle, choose your price and let
                        travelers discover their next adventure.

                    </motion.p>


                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="
                            flex
                            flex-wrap
                            gap-3
                            mt-6
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-white/10
                                border
                                border-white/10
                                text-xs
                                text-white/90
                            "
                        >
                            <span className="text-emerald-300">
                                ✓
                            </span>

                            Set your own price
                        </div>


                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-white/10
                                border
                                border-white/10
                                text-xs
                                text-white/90
                            "
                        >
                            <span className="text-emerald-300">
                                ✓
                            </span>

                            Secure payments
                        </div>


                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-white/10
                                border
                                border-white/10
                                text-xs
                                text-white/90
                            "
                        >
                            <span className="text-emerald-300">
                                ✓
                            </span>

                            Verified travelers
                        </div>

                    </motion.div>


                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleListRV}
                        className="
                            mt-7
                            inline-flex
                            items-center
                            gap-3
                            px-6
                            py-3.5
                            rounded-xl
                            bg-emerald-400
                            hover:bg-emerald-300
                            text-[#06231d]
                            font-bold
                            text-sm
                            shadow-lg
                            shadow-emerald-900/30
                            transition-all
                            cursor-pointer
                        "
                    >

                        List Your RV

                        <span className="text-lg">
                            →
                        </span>

                    </motion.button>

                </div>

            </div>


            {/* Bottom Stats */}
            <div
                className="
                    absolute
                    bottom-5
                    right-7
                    md:right-10
                    hidden
                    lg:flex
                    items-center
                    gap-6
                    text-white/80
                    text-xs
                "
            >

                <div>

                    <p className="
                        text-white
                        font-bold
                        text-base
                    ">
                        100%
                    </p>

                    <p>
                        Owner control
                    </p>

                </div>


                <div className="
                    w-px
                    h-8
                    bg-white/20
                " />


                <div>

                    <p className="
                        text-white
                        font-bold
                        text-base
                    ">
                        24/7
                    </p>

                    <p>
                        Support
                    </p>

                </div>

            </div>

        </motion.section>
    )
}

export default Banner