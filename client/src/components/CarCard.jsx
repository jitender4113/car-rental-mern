import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const CarCard = ({ car }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/car-details/${car._id}`)
        window.scrollTo(0, 0)
    }

    return (
        <motion.div
            onClick={handleClick}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="
                group
                bg-white
                rounded-[22px]
                overflow-hidden
                border border-[#e8e5df]
                shadow-[0_8px_30px_rgba(30,40,35,0.07)]
                hover:shadow-[0_18px_45px_rgba(30,40,35,0.13)]
                transition-shadow
                duration-500
                cursor-pointer
            "
        >

            {/* ================= IMAGE ================= */}
            <div className="relative h-56 overflow-hidden">

                <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.06]
                    "
                />

                {/* Image gradient */}
                <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-24
                    bg-gradient-to-t
                    from-black/45
                    to-transparent
                " />


                {/* Availability */}
                {car.isAvaliable && (
                    <div className="
                        absolute
                        top-4
                        left-4
                        flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-full
                        bg-white/95
                        backdrop-blur-sm
                        text-[#123c32]
                        text-[11px]
                        font-semibold
                        shadow-sm
                    ">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Available
                    </div>
                )}


                {/* Price */}
                <div className="
                    absolute
                    bottom-4
                    right-4
                    bg-[#123c32]/95
                    backdrop-blur-md
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    shadow-lg
                ">
                    <span className="text-base font-semibold">
                        {currency}{car.pricePerDay}
                    </span>

                    <span className="text-[11px] text-white/60 ml-1">
                        / day
                    </span>
                </div>

            </div>


            {/* ================= CONTENT ================= */}
            <div className="p-5">

                {/* Title */}
                <div className="flex items-start justify-between gap-3">

                    <div>

                        <h3 className="
                            text-lg
                            font-semibold
                            text-[#202522]
                            group-hover:text-[#123c32]
                            transition-colors
                        ">
                            {car.brand} {car.model}
                        </h3>

                        <p className="
                            text-gray-400
                            text-xs
                            mt-1.5
                        ">
                            {car.category} <span className="mx-1">•</span> {car.year}
                        </p>

                    </div>


                    {/* Vehicle type */}
                    <span className="
                        shrink-0
                        px-2.5
                        py-1
                        rounded-lg
                        bg-[#f2f6f3]
                        text-[#31594d]
                        text-[10px]
                        font-semibold
                    ">
                        {car.vehicleType}
                    </span>

                </div>


                {/* Divider */}
                <div className="h-px bg-[#eeeae3] my-4" />


                {/* Specs */}
                <div className="grid grid-cols-2 gap-y-3">

                    {/* Sleeps */}
                    <div className="flex items-center gap-2.5">

                        <div className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#f5f7f5]
                            flex
                            items-center
                            justify-center
                        ">
                            <img
                                src={assets.users_icon}
                                alt=""
                                className="w-4 h-4 opacity-60"
                            />
                        </div>

                        <div>
                            <p className="text-[10px] text-gray-400">
                                Sleeps
                            </p>

                            <p className="text-xs font-medium text-gray-700">
                                {car.sleeps} Guests
                            </p>
                        </div>

                    </div>


                    {/* Amenities */}
                    <div className="flex items-center gap-2.5">

                        <div className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#f5f7f5]
                            flex
                            items-center
                            justify-center
                        ">
                            <span className="text-sm">
                                ✦
                            </span>
                        </div>

                        <div>
                            <p className="text-[10px] text-gray-400">
                                Amenities
                            </p>

                            <p className="text-xs font-medium text-gray-700">
                                {car.amenities?.length || 0} Included
                            </p>
                        </div>

                    </div>


                    {/* Location */}
                    <div className="flex items-center gap-2.5">

                        <div className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#f5f7f5]
                            flex
                            items-center
                            justify-center
                        ">
                            <img
                                src={assets.location_icon}
                                alt=""
                                className="w-4 h-4 opacity-60"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[10px] text-gray-400">
                                Location
                            </p>

                            <p className="
                                text-xs
                                font-medium
                                text-gray-700
                                truncate
                                max-w-[110px]
                            ">
                                {car.location}
                            </p>
                        </div>

                    </div>


                    {/* Type */}
                    <div className="flex items-center gap-2.5">

                        <div className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#f5f7f5]
                            flex
                            items-center
                            justify-center
                        ">
                            <span className="text-sm text-[#31594d]">
                                🚐
                            </span>
                        </div>

                        <div>
                            <p className="text-[10px] text-gray-400">
                                Category
                            </p>

                            <p className="text-xs font-medium text-gray-700">
                                {car.category}
                            </p>
                        </div>

                    </div>

                </div>


                {/* View Details */}
                <div className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    pt-4
                    border-t
                    border-[#eeeae3]
                ">

                    <span className="
                        text-xs
                        text-gray-400
                    ">
                        Ready for your next adventure
                    </span>

                    <span className="
                        text-[#123c32]
                        text-sm
                        font-semibold
                        group-hover:translate-x-1
                        transition-transform
                    ">
                        View →
                    </span>

                </div>

            </div>

        </motion.div>
    )
}

export default CarCard