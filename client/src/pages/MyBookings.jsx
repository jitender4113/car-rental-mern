import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const MyBookings = () => {

    const { axios, user, currency } = useAppContext()

    const [bookings, setBookings] = useState([])

    const fetchMyBookings = async () => {

        try {

            const { data } = await axios.get('/api/bookings/user')

            if (data.success) {
                setBookings(data.bookings)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }


    useEffect(() => {
        user && fetchMyBookings()
    }, [user])


    return (

        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
                min-h-screen
                bg-[#fafbf9]
                px-6
                md:px-16
                lg:px-24
                xl:px-32
                py-14
                text-sm
            "
        >

            {/* ================= HEADER ================= */}

            <div className="max-w-6xl mx-auto">

                <Title
                    title="My Bookings"
                    subTitle="View and manage your upcoming RV adventures, rental dates and booking details."
                    align="left"
                />


                {/* ================= BOOKINGS ================= */}

                {bookings.length === 0 ? (

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="
                            mt-12
                            bg-white
                            border border-[#e3e8e5]
                            rounded-[24px]
                            py-20
                            px-6
                            flex flex-col
                            items-center
                            justify-center
                            text-center
                        "
                    >

                        <div className="
                            w-16 h-16
                            rounded-2xl
                            bg-[#eef5f1]
                            flex items-center justify-center
                            text-2xl
                            mb-5
                        ">
                            🚐
                        </div>

                        <h2 className="
                            text-xl
                            font-semibold
                            text-[#17211d]
                        ">
                            No bookings yet
                        </h2>

                        <p className="
                            text-gray-400
                            text-sm
                            mt-2
                            max-w-md
                            leading-6
                        ">
                            Your next adventure is waiting. Explore our RV collection
                            and find the perfect vehicle for your journey.
                        </p>

                    </motion.div>

                ) : (

                    <div className="mt-12 space-y-6">

                        {bookings.map((booking, index) => (

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: Math.min(index * 0.08, 0.4),
                                    duration: 0.45
                                }}
                                key={booking._id}
                                className="
                                    bg-white
                                    border border-[#e3e8e5]
                                    rounded-[24px]
                                    overflow-hidden
                                    shadow-[0_8px_30px_rgba(30,40,35,0.05)]
                                    hover:shadow-[0_14px_40px_rgba(30,40,35,0.08)]
                                    transition-shadow
                                "
                            >

                                <div className="
                                    grid
                                    grid-cols-1
                                    md:grid-cols-4
                                    gap-0
                                ">

                                    {/* ================= RV IMAGE ================= */}

                                    <div className="
                                        md:col-span-1
                                        p-5
                                    ">

                                        <div className="
                                            relative
                                            rounded-[18px]
                                            overflow-hidden
                                            bg-gray-100
                                        ">

                                            <img
                                                src={booking.car.image}
                                                alt={`${booking.car.brand} ${booking.car.model}`}
                                                className="
                                                    w-full
                                                    aspect-[4/3]
                                                    object-cover
                                                    transition-transform
                                                    duration-500
                                                    hover:scale-105
                                                "
                                            />

                                            <div className="
                                                absolute
                                                top-3
                                                left-3
                                                bg-white/95
                                                backdrop-blur-sm
                                                px-3
                                                py-1.5
                                                rounded-full
                                                text-[10px]
                                                font-semibold
                                                text-[#123c32]
                                            ">
                                                {booking.car.vehicleType || 'RV'}
                                            </div>

                                        </div>


                                        <div className="mt-4">

                                            <h3 className="
                                                text-lg
                                                font-semibold
                                                text-[#17211d]
                                            ">
                                                {booking.car.brand} {booking.car.model}
                                            </h3>

                                            <p className="
                                                text-gray-400
                                                text-xs
                                                mt-1.5
                                            ">
                                                {booking.car.year}
                                                {' • '}
                                                {booking.car.category}
                                            </p>

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                mt-3
                                                text-xs
                                                text-gray-500
                                            ">
                                                <img
                                                    src={assets.location_icon}
                                                    alt=""
                                                    className="w-3.5 opacity-50"
                                                />

                                                {booking.car.location}
                                            </div>

                                        </div>

                                    </div>


                                    {/* ================= BOOKING INFO ================= */}

                                    <div className="
                                        md:col-span-2
                                        px-5
                                        md:px-6
                                        py-5
                                        md:py-7
                                        border-t
                                        md:border-t-0
                                        md:border-l
                                        border-[#edf0ee]
                                    ">

                                        {/* Booking number + status */}

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                        ">

                                            <div className="
                                                px-3
                                                py-1.5
                                                rounded-lg
                                                bg-[#f3f6f4]
                                                text-[#31594d]
                                                text-xs
                                                font-medium
                                            ">
                                                Booking #{index + 1}
                                            </div>


                                            <span
                                                className={`
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    text-[10px]
                                                    font-semibold
                                                    capitalize
                                                    ${
                                                        booking.status === 'confirmed'
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : booking.status === 'pending'
                                                            ? 'bg-amber-50 text-amber-700'
                                                            : 'bg-red-50 text-red-600'
                                                    }
                                                `}
                                            >
                                                {booking.status}
                                            </span>

                                        </div>


                                        {/* Rental period */}

                                        <div className="
                                            flex
                                            items-start
                                            gap-3
                                            mt-7
                                        ">

                                            <div className="
                                                w-9
                                                h-9
                                                rounded-xl
                                                bg-[#eef5f1]
                                                flex
                                                items-center
                                                justify-center
                                                shrink-0
                                            ">
                                                <img
                                                    src={assets.calendar_icon_colored}
                                                    alt=""
                                                    className="w-4"
                                                />
                                            </div>

                                            <div>

                                                <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                    font-medium
                                                ">
                                                    Rental Period
                                                </p>

                                                <p className="
                                                    text-sm
                                                    font-medium
                                                    text-gray-700
                                                    mt-1
                                                ">
                                                    {booking.pickupDate.split('T')[0]}
                                                    {' '}
                                                    <span className="text-gray-300 mx-1">
                                                        →
                                                    </span>
                                                    {' '}
                                                    {booking.returnDate.split('T')[0]}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Pickup location */}

                                        <div className="
                                            flex
                                            items-start
                                            gap-3
                                            mt-5
                                        ">

                                            <div className="
                                                w-9
                                                h-9
                                                rounded-xl
                                                bg-[#eef5f1]
                                                flex
                                                items-center
                                                justify-center
                                                shrink-0
                                            ">
                                                <img
                                                    src={assets.location_icon_colored}
                                                    alt=""
                                                    className="w-4"
                                                />
                                            </div>

                                            <div>

                                                <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                    font-medium
                                                ">
                                                    Pick-up Location
                                                </p>

                                                <p className="
                                                    text-sm
                                                    font-medium
                                                    text-gray-700
                                                    mt-1
                                                ">
                                                    {booking.car.location}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Amenities */}

                                        {booking.car.amenities?.length > 0 && (

                                            <div className="mt-6">

                                                <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-400
                                                    font-medium
                                                    mb-2
                                                ">
                                                    Amenities
                                                </p>

                                                <div className="
                                                    flex
                                                    flex-wrap
                                                    gap-2
                                                ">

                                                    {booking.car.amenities
                                                        .slice(0, 4)
                                                        .map((amenity) => (

                                                            <span
                                                                key={amenity}
                                                                className="
                                                                    px-2.5
                                                                    py-1
                                                                    rounded-lg
                                                                    bg-[#f7f8f6]
                                                                    border border-[#e8ebe8]
                                                                    text-[10px]
                                                                    text-gray-500
                                                                "
                                                            >
                                                                {amenity}
                                                            </span>

                                                        ))}

                                                </div>

                                            </div>

                                        )}

                                    </div>


                                    {/* ================= PRICE ================= */}

                                    <div className="
                                        md:col-span-1
                                        px-5
                                        md:px-6
                                        py-5
                                        md:py-7
                                        border-t
                                        md:border-l
                                        border-[#edf0ee]
                                        flex
                                        flex-col
                                        justify-between
                                    ">

                                        <div className="md:text-right">

                                            <p className="
                                                text-[10px]
                                                uppercase
                                                tracking-wider
                                                text-gray-400
                                                font-medium
                                            ">
                                                Total Price
                                            </p>

                                            <p className="
                                                text-2xl
                                                font-semibold
                                                text-[#123c32]
                                                mt-1
                                            ">
                                                {currency}{booking.price}
                                            </p>

                                            <p className="
                                                text-[11px]
                                                text-gray-400
                                                mt-2
                                            ">
                                                Booked on{' '}
                                                {booking.createdAt.split('T')[0]}
                                            </p>

                                        </div>


                                        <div className="
                                            hidden
                                            md:flex
                                            items-center
                                            justify-end
                                            gap-1.5
                                            text-[10px]
                                            text-gray-400
                                            mt-8
                                        ">
                                            <span className="text-[#c6a15b]">
                                                ✦
                                            </span>
                                            Your adventure awaits
                                        </div>

                                    </div>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                )}

            </div>

        </motion.div>
    )
}

export default MyBookings