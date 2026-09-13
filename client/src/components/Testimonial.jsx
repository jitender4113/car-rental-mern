import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonial = () => {

    const testimonials = [
        {
            name: "Emma Rodriguez",
            location: "Barcelona, Spain",
            image: assets.testimonial_image_1,
            testimonial:
                "The RV was absolutely beautiful and felt like a luxury hotel on wheels. Everything was perfectly prepared for our road trip."
        },
        {
            name: "John Smith",
            location: "New York, USA",
            image: assets.testimonial_image_2,
            testimonial:
                "From booking to pickup, everything was incredibly smooth. The RV was spotless, comfortable and perfect for our family adventure."
        },
        {
            name: "Ava Johnson",
            location: "Sydney, Australia",
            image: assets.testimonial_image_1,
            testimonial:
                "I've rented RVs before, but this was on another level. The vehicle, amenities and overall experience were genuinely premium."
        }
    ]

    return (
        <section className="relative py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-[#f7f5f0] overflow-hidden">

            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#e7dfcf]/40 blur-3xl pointer-events-none" />

            <div className="relative z-10">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <Title
                        title="Loved by Travelers"
                        subTitle="Exceptional journeys, unforgettable stays and experiences worth talking about."
                    />
                </motion.div>


                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">

                    {testimonials.map((testimonial, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.15
                            }}
                            whileHover={{ y: -7 }}
                            className="group"
                        >

                            <div className="relative h-full bg-white rounded-[24px] p-8 border border-[#e5dfd3] shadow-[0_12px_35px_rgba(55,45,30,0.06)] hover:shadow-[0_20px_45px_rgba(55,45,30,0.11)] transition-all duration-500">

                                {/* Gold corner detail */}
                                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-[24px]">
                                    <div className="absolute -right-10 -top-10 w-20 h-20 rounded-full border border-[#c6a15b]/30" />
                                </div>


                                {/* Quote */}
                                <div className="text-[#c6a15b] text-6xl font-serif leading-none h-12">
                                    “
                                </div>


                                {/* Review */}
                                <p className="text-[#45433e] text-[15px] leading-7 mt-3 min-h-[150px]">
                                    {testimonial.testimonial}
                                </p>


                                {/* Rating */}
                                <div className="flex items-center gap-1 mt-6">

                                    {Array(5).fill(0).map((_, starIndex) => (
                                        <span
                                            key={starIndex}
                                            className="text-[#c6a15b] text-[15px]"
                                        >
                                            ★
                                        </span>
                                    ))}

                                    <span className="text-[#9a968d] text-xs ml-2">
                                        5.0
                                    </span>

                                </div>


                                {/* Divider */}
                                <div className="h-px bg-[#ebe6dc] my-7" />


                                {/* Customer */}
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">

                                        <div className="relative">

                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full object-cover ring-4 ring-[#f5f1e9]"
                                            />

                                            <span className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#c6a15b] text-white text-[10px] border-2 border-white">
                                                ✓
                                            </span>

                                        </div>

                                        <div>
                                            <p className="text-[#24231f] font-semibold text-sm">
                                                {testimonial.name}
                                            </p>

                                            <p className="text-[#99948a] text-xs mt-1">
                                                {testimonial.location}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Small RV badge */}
                                    <div className="text-[#c6a15b] text-[10px] tracking-[0.15em] font-semibold">
                                        VERIFIED
                                    </div>

                                </div>


                                {/* Bottom gold line */}
                                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-[#c6a15b] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                            </div>

                        </motion.div>

                    ))}

                </div>


                {/* Trust section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
                >

                    <div className="flex items-center gap-2">

                        <span className="text-[#c6a15b] text-sm tracking-wider">
                            ★★★★★
                        </span>

                        <span className="text-[#24231f] font-semibold text-sm">
                            4.9 / 5
                        </span>

                    </div>

                    <span className="hidden sm:block text-[#d2ccc0]">
                        |
                    </span>

                    <p className="text-[#8b867c] text-sm">
                        Trusted by travelers around the world
                    </p>

                </motion.div>

            </div>

        </section>
    )
}

export default Testimonial