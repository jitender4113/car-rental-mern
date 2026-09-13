import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CarDetails = () => {
    const { id } = useParams();

    const {
        cars,
        axios,
        token,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        setShowLogin,
    } = useAppContext();

    const navigate = useNavigate();

    const [car, setCar] = useState(null);

    const currency = import.meta.env.VITE_CURRENCY;

    // =========================================
    // RESERVE RV
    // =========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // -----------------------------------------
        // LOGIN CHECK
        // -----------------------------------------
        // User can browse RVs without login,
        // but login is required to reserve one.
        if (!token) {
            toast("Please login to reserve this RV");

            setShowLogin(true);

            return;
        }

        // -----------------------------------------
        // DATE VALIDATION
        // -----------------------------------------

        if (!pickupDate || !returnDate) {
            toast.error("Please select pickup and return dates");
            return;
        }

        if (new Date(returnDate) <= new Date(pickupDate)) {
            toast.error("Return date must be after pickup date");
            return;
        }

        // -----------------------------------------
        // CREATE BOOKING
        // -----------------------------------------

        try {
            const { data } = await axios.post(
                "/api/bookings/create",
                {
                    car: id,
                    pickupDate,
                    returnDate,
                }
            );

            if (data.success) {
                toast.success(
                    data.message || "RV reserved successfully"
                );

                navigate("/my-bookings");
            } else {
                toast.error(
                    data.message || "Unable to reserve this RV"
                );

                // Extra protection in case backend
                // returns unauthorized.
                if (
                    data.message?.toLowerCase().includes(
                        "not authorized"
                    )
                ) {
                    setShowLogin(true);
                }
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Unable to reserve this RV";

            // -----------------------------------------
            // HANDLE UNAUTHORIZED
            // -----------------------------------------

            if (
                message.toLowerCase().includes("not authorized") ||
                error.response?.status === 401
            ) {
                toast("Please login to reserve this RV");
                setShowLogin(true);
                return;
            }

            toast.error(message);
        }
    };

    // =========================================
    // FIND RV
    // =========================================

    useEffect(() => {
        setCar(
            cars.find((car) => car._id === id)
        );
    }, [cars, id]);

    // =========================================
    // PAGE
    // =========================================

    return car ? (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16 bg-[#fafbf9] min-h-screen">

            {/* Back */}

            <motion.button
                initial={{
                    opacity: 0,
                    x: -15,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                onClick={() => navigate(-1)}
                className="
                    flex items-center gap-2 mb-8
                    text-gray-500 hover:text-[#123c32]
                    text-sm font-medium
                    transition-colors cursor-pointer
                "
            >
                <img
                    src={assets.arrow_icon}
                    alt=""
                    className="rotate-180 w-4 opacity-60"
                />

                Back to all RVs
            </motion.button>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

                {/* ================= LEFT ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="lg:col-span-2"
                >

                    {/* Image */}

                    <div className="
                        relative
                        overflow-hidden
                        rounded-[26px]
                        bg-gray-200
                        shadow-[0_15px_45px_rgba(30,40,35,0.10)]
                    ">

                        <motion.img
                            initial={{
                                scale: 1.04,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            className="
                                w-full
                                h-[280px]
                                md:h-[430px]
                                object-cover
                            "
                        />

                        {/* Availability */}

                        {car.isAvaliable && (
                            <div className="
                                absolute top-5 left-5
                                flex items-center gap-2
                                bg-white/95 backdrop-blur-md
                                px-4 py-2 rounded-full
                                text-[#123c32] text-xs font-semibold
                                shadow-md
                            ">
                                <span className="
                                    w-2 h-2
                                    rounded-full
                                    bg-emerald-500
                                " />

                                Available for booking
                            </div>
                        )}

                        {/* Vehicle type */}

                        <div className="
                            absolute bottom-5 left-5
                            bg-[#123c32]/95 backdrop-blur-md
                            text-white
                            px-4 py-2 rounded-xl
                            text-xs font-medium
                        ">
                            {car.vehicleType}
                        </div>

                    </div>


                    {/* Main information */}

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.5,
                        }}
                        className="mt-8"
                    >

                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-start
                            md:justify-between
                            gap-4
                        ">

                            <div>

                                <p className="
                                    text-[#c6a15b]
                                    text-[10px]
                                    font-semibold
                                    tracking-[0.2em]
                                    uppercase
                                    mb-2
                                ">
                                    {car.category}
                                </p>

                                <h1 className="
                                    text-3xl md:text-4xl
                                    font-semibold
                                    tracking-tight
                                    text-[#17211d]
                                ">
                                    {car.brand} {car.model}
                                </h1>

                                <p className="
                                    text-gray-400
                                    text-sm
                                    mt-2
                                ">
                                    {car.year} • {car.location}
                                </p>

                            </div>

                            <div className="md:text-right">

                                <p className="
                                    text-2xl
                                    font-semibold
                                    text-[#123c32]
                                ">
                                    {currency}
                                    {car.pricePerDay}
                                </p>

                                <p className="
                                    text-xs
                                    text-gray-400
                                    mt-1
                                ">
                                    per day
                                </p>

                            </div>

                        </div>


                        <div className="
                            h-px
                            bg-[#e6e9e6]
                            my-8
                        " />


                        {/* RV Specs */}

                        <div className="
                            grid
                            grid-cols-2
                            md:grid-cols-4
                            gap-4
                        ">

                            {/* Sleeps */}

                            <div className="
                                bg-white
                                border border-[#e4e8e5]
                                rounded-2xl
                                p-5
                            ">

                                <div className="
                                    w-10 h-10
                                    rounded-xl
                                    bg-[#eef5f1]
                                    flex items-center justify-center
                                    mb-3
                                ">
                                    <img
                                        src={assets.users_icon}
                                        alt=""
                                        className="w-5 opacity-70"
                                    />
                                </div>

                                <p className="
                                    text-[10px]
                                    text-gray-400
                                    uppercase
                                    tracking-wider
                                ">
                                    Sleeps
                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mt-1
                                ">
                                    {car.sleeps} Guests
                                </p>

                            </div>


                            {/* Type */}

                            <div className="
                                bg-white
                                border border-[#e4e8e5]
                                rounded-2xl
                                p-5
                            ">

                                <div className="
                                    w-10 h-10
                                    rounded-xl
                                    bg-[#eef5f1]
                                    flex items-center justify-center
                                    mb-3
                                ">
                                    <span className="
                                        text-[#123c32]
                                        text-lg
                                    ">
                                        ✦
                                    </span>
                                </div>

                                <p className="
                                    text-[10px]
                                    text-gray-400
                                    uppercase
                                    tracking-wider
                                ">
                                    Type
                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mt-1
                                ">
                                    {car.vehicleType}
                                </p>

                            </div>


                            {/* Location */}

                            <div className="
                                bg-white
                                border border-[#e4e8e5]
                                rounded-2xl
                                p-5
                            ">

                                <div className="
                                    w-10 h-10
                                    rounded-xl
                                    bg-[#eef5f1]
                                    flex items-center justify-center
                                    mb-3
                                ">
                                    <img
                                        src={assets.location_icon}
                                        alt=""
                                        className="w-5 opacity-60"
                                    />
                                </div>

                                <p className="
                                    text-[10px]
                                    text-gray-400
                                    uppercase
                                    tracking-wider
                                ">
                                    Location
                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mt-1
                                    truncate
                                ">
                                    {car.location}
                                </p>

                            </div>


                            {/* Category */}

                            <div className="
                                bg-white
                                border border-[#e4e8e5]
                                rounded-2xl
                                p-5
                            ">

                                <div className="
                                    w-10 h-10
                                    rounded-xl
                                    bg-[#eef5f1]
                                    flex items-center justify-center
                                    mb-3
                                ">
                                    <span className="
                                        text-[#123c32]
                                        text-lg
                                    ">
                                        🚐
                                    </span>
                                </div>

                                <p className="
                                    text-[10px]
                                    text-gray-400
                                    uppercase
                                    tracking-wider
                                ">
                                    Category
                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mt-1
                                ">
                                    {car.category}
                                </p>

                            </div>

                        </div>


                        {/* Description */}

                        <div className="mt-10">

                            <h2 className="
                                text-xl
                                font-semibold
                                text-[#17211d]
                                mb-3
                            ">
                                About this RV
                            </h2>

                            <p className="
                                text-gray-500
                                text-sm
                                md:text-[15px]
                                leading-7
                                max-w-3xl
                            ">
                                {car.description}
                            </p>

                        </div>


                        {/* Amenities */}

                        <div className="mt-10">

                            <h2 className="
                                text-xl
                                font-semibold
                                text-[#17211d]
                                mb-5
                            ">
                                What's included
                            </h2>

                            {car.amenities?.length > 0 ? (

                                <div className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    gap-3
                                ">

                                    {car.amenities.map(
                                        (amenity, index) => (
                                            <motion.div
                                                key={`${amenity}-${index}`}
                                                initial={{
                                                    opacity: 0,
                                                    x: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay:
                                                        index * 0.04,
                                                    duration: 0.3,
                                                }}
                                                className="
                                                    flex items-center gap-3
                                                    bg-white
                                                    border border-[#e5e9e6]
                                                    rounded-xl
                                                    px-4 py-3
                                                "
                                            >

                                                <div className="
                                                    w-7 h-7
                                                    rounded-full
                                                    bg-[#eef5f1]
                                                    flex items-center justify-center
                                                    shrink-0
                                                ">
                                                    <img
                                                        src={assets.check_icon}
                                                        alt=""
                                                        className="w-3.5"
                                                    />
                                                </div>

                                                <span className="
                                                    text-sm
                                                    text-gray-600
                                                ">
                                                    {amenity}
                                                </span>

                                            </motion.div>
                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="
                                    text-sm
                                    text-gray-400
                                ">
                                    No amenities listed for this RV.
                                </p>

                            )}

                        </div>

                    </motion.div>

                </motion.div>


                {/* ================= RIGHT - BOOKING ================= */}

                <motion.form
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.25,
                        duration: 0.6,
                    }}
                    onSubmit={handleSubmit}
                    className="
                        h-max
                        sticky top-6
                        bg-white
                        border border-[#e4e8e5]
                        rounded-[24px]
                        p-6 md:p-7
                        shadow-[0_15px_45px_rgba(30,40,35,0.08)]
                    "
                >

                    {/* Price */}

                    <div className="
                        flex
                        items-end
                        justify-between
                    ">

                        <div>

                            <p className="
                                text-[10px]
                                text-gray-400
                                uppercase
                                tracking-[0.15em]
                            ">
                                Rental price
                            </p>

                            <p className="
                                text-3xl
                                font-semibold
                                text-[#123c32]
                                mt-1
                            ">
                                {currency}
                                {car.pricePerDay}
                            </p>

                        </div>

                        <span className="
                            text-sm
                            text-gray-400
                            pb-1
                        ">
                            / day
                        </span>

                    </div>


                    <div className="
                        h-px
                        bg-[#e9ecea]
                        my-6
                    " />


                    {/* Pickup */}

                    <div className="
                        flex
                        flex-col
                        gap-2
                        mb-5
                    ">

                        <label
                            htmlFor="pickup-date"
                            className="
                                text-xs
                                font-medium
                                text-gray-600
                            "
                        >
                            Pickup date
                        </label>

                        <input
                            value={pickupDate}
                            onChange={(e) =>
                                setPickupDate(e.target.value)
                            }
                            type="date"
                            id="pickup-date"
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            className="
                                w-full
                                border border-[#dfe5e1]
                                px-4 py-3
                                rounded-xl
                                text-sm text-gray-700
                                outline-none
                                focus:border-[#123c32]
                                focus:ring-2
                                focus:ring-[#123c32]/10
                                transition-all
                            "
                            required
                        />

                    </div>


                    {/* Return */}

                    <div className="
                        flex
                        flex-col
                        gap-2
                    ">

                        <label
                            htmlFor="return-date"
                            className="
                                text-xs
                                font-medium
                                text-gray-600
                            "
                        >
                            Return date
                        </label>

                        <input
                            value={returnDate}
                            onChange={(e) =>
                                setReturnDate(e.target.value)
                            }
                            type="date"
                            id="return-date"
                            min={
                                pickupDate ||
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            className="
                                w-full
                                border border-[#dfe5e1]
                                px-4 py-3
                                rounded-xl
                                text-sm text-gray-700
                                outline-none
                                focus:border-[#123c32]
                                focus:ring-2
                                focus:ring-[#123c32]/10
                                transition-all
                            "
                            required
                        />

                    </div>


                    {/* Reserve */}

                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="
                            w-full
                            mt-6
                            bg-[#123c32]
                            hover:bg-[#0d3028]
                            text-white
                            py-3.5
                            rounded-xl
                            text-sm
                            font-medium
                            transition-all
                            cursor-pointer
                            shadow-lg
                            shadow-[#123c32]/10
                        "
                    >
                        Reserve this RV →
                    </motion.button>


                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        mt-4
                        text-[11px]
                        text-gray-400
                    ">
                        <span className="text-emerald-600">
                            ✓
                        </span>

                        Login required to reserve
                    </div>


                    {/* Trust box */}

                    <div className="
                        mt-6
                        rounded-xl
                        bg-[#f5f8f6]
                        border border-[#e2ebe5]
                        p-4
                    ">

                        <p className="
                            text-xs
                            font-semibold
                            text-[#123c32]
                        ">
                            Ready for the open road?
                        </p>

                        <p className="
                            text-[11px]
                            text-gray-400
                            leading-5
                            mt-1
                        ">
                            Choose your dates and reserve this RV
                            for your next adventure.
                        </p>

                    </div>

                </motion.form>

            </div>

        </div>
    ) : (
        <Loader />
    );
};

export default CarDetails;