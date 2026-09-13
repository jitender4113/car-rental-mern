import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState("");

    const {
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        navigate
    } = useAppContext();


    // =====================================================
    // INDIAN LOCATIONS
    // =====================================================

    const indianLocations = [
        "Delhi, India",
        "Gurugram, Haryana",
        "Noida, Uttar Pradesh",
        "Chandigarh, India",

        "Jaipur, Rajasthan",
        "Udaipur, Rajasthan",
        "Jaisalmer, Rajasthan",
        "Jodhpur, Rajasthan",

        "Agra, Uttar Pradesh",
        "Lucknow, Uttar Pradesh",
        "Varanasi, Uttar Pradesh",

        "Rishikesh, Uttarakhand",
        "Dehradun, Uttarakhand",
        "Haridwar, Uttarakhand",

        "Manali, Himachal Pradesh",
        "Shimla, Himachal Pradesh",
        "Dharamshala, Himachal Pradesh",

        "Amritsar, Punjab",
        "Srinagar, Jammu & Kashmir",
        "Leh, Ladakh",

        "Mumbai, Maharashtra",
        "Pune, Maharashtra",
        "Nashik, Maharashtra",
        "Nagpur, Maharashtra",

        "Goa, India",

        "Ahmedabad, Gujarat",
        "Surat, Gujarat",

        "Bengaluru, Karnataka",
        "Mysuru, Karnataka",

        "Hyderabad, Telangana",

        "Chennai, Tamil Nadu",

        "Kochi, Kerala",
        "Thiruvananthapuram, Kerala",

        "Kolkata, West Bengal",

        "Bhubaneswar, Odisha",

        "Bhopal, Madhya Pradesh",
        "Indore, Madhya Pradesh",

        "Patna, Bihar",
        "Ranchi, Jharkhand",

        "Guwahati, Assam",
    ];


    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = (e) => {

        e.preventDefault();

        if (!pickupLocation) {
            return;
        }

        navigate(
            "/cars?pickupLocation=" +
            encodeURIComponent(pickupLocation) +
            "&pickupDate=" +
            encodeURIComponent(pickupDate) +
            "&returnDate=" +
            encodeURIComponent(returnDate)
        );
    };


    return (
        <section className="relative h-[680px] md:h-[620px] overflow-hidden">

            {/* ================= BACKGROUND ================= */}

            <div className="absolute inset-0">

                <img
                    src={assets.hero_image}
                    alt="Luxury caravan in the mountains"
                    className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/5" />

                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-r
                        from-black/50
                        via-black/20
                        to-transparent
                    "
                />

                <div
                    className="
                        absolute inset-x-0 bottom-0 h-40
                        bg-gradient-to-t
                        from-black/25
                        to-transparent
                    "
                />

            </div>


            {/* ================= HERO CONTENT ================= */}

            <div
                className="
                    relative z-10
                    max-w-[1500px]
                    mx-auto
                    h-full
                    px-6 md:px-10 lg:px-16 xl:px-24
                "
            >

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className="
                        absolute
                        left-6 md:left-10 lg:left-16 xl:left-24
                        top-20 md:top-24
                        max-w-[570px]
                    "
                >

                    {/* EYEBROW */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -15
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        transition={{
                            delay: 0.15,
                            duration: 0.6
                        }}
                        className="flex items-center gap-3 mb-5"
                    >

                        <span className="w-9 h-[2px] bg-emerald-300" />

                        <span
                            className="
                                text-white
                                text-[11px] md:text-xs
                                font-semibold
                                tracking-[0.25em]
                                uppercase
                                drop-shadow
                            "
                        >
                            THE FREEDOM TO EXPLORE
                        </span>

                    </motion.div>


                    {/* HEADING */}

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.7
                        }}
                        className="
                            text-white
                            text-[48px]
                            sm:text-[56px]
                            md:text-[64px]
                            lg:text-[72px]
                            font-semibold
                            leading-[0.98]
                            tracking-[-0.035em]
                            drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                        "
                    >

                        Your Home
                        <br />

                        <span className="text-emerald-300">
                            on the Road.
                        </span>

                    </motion.h1>


                    {/* DESCRIPTION */}

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.35,
                            duration: 0.7
                        }}
                        className="
                            text-white/90
                            text-sm md:text-base
                            leading-7
                            max-w-[500px]
                            mt-6
                            drop-shadow-md
                        "
                    >

                        Discover beautifully equipped caravans and RVs,
                        handpicked for unforgettable road trips, peaceful
                        escapes and everything in between.

                    </motion.p>


                    {/* TRUST POINTS */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.5,
                            duration: 0.7
                        }}
                        className="
                            flex flex-wrap
                            items-center
                            gap-x-6 gap-y-3
                            mt-7
                        "
                    >

                        <div className="flex items-center gap-2 text-white text-xs md:text-sm">

                            <span
                                className="
                                    w-6 h-6
                                    rounded-full
                                    bg-white/15
                                    border border-white/25
                                    backdrop-blur-sm
                                    flex items-center justify-center
                                    text-emerald-300
                                    font-bold
                                "
                            >
                                ✓
                            </span>

                            Trusted Owners

                        </div>


                        <div className="flex items-center gap-2 text-white text-xs md:text-sm">

                            <span
                                className="
                                    w-6 h-6
                                    rounded-full
                                    bg-white/15
                                    border border-white/25
                                    backdrop-blur-sm
                                    flex items-center justify-center
                                    text-emerald-300
                                    font-bold
                                "
                            >
                                ✓
                            </span>

                            Verified RVs

                        </div>


                        <div className="flex items-center gap-2 text-white text-xs md:text-sm">

                            <span
                                className="
                                    w-6 h-6
                                    rounded-full
                                    bg-white/15
                                    border border-white/25
                                    backdrop-blur-sm
                                    flex items-center justify-center
                                    text-emerald-300
                                    font-bold
                                "
                            >
                                ✓
                            </span>

                            Secure Booking

                        </div>

                    </motion.div>

                </motion.div>


                {/* ================= RIGHT TAG ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 25
                    }}
                    animate={{
                        opacity: 1,
                        x: 0
                    }}
                    transition={{
                        delay: 0.7,
                        duration: 0.7
                    }}
                    className="
                        absolute
                        hidden md:flex
                        right-8 lg:right-16 xl:right-24
                        bottom-40
                        items-center gap-3
                        px-5 py-3
                        rounded-full
                        bg-black/15
                        border border-white/20
                        backdrop-blur-md
                        text-white
                    "
                >

                    <span className="text-emerald-300 text-lg">
                        ✦
                    </span>

                    <span className="text-xs lg:text-sm font-medium tracking-wide">
                        More roads. More stories.
                    </span>

                </motion.div>

            </div>


            {/* ================= SEARCH WIDGET ================= */}

            <motion.form
                initial={{
                    opacity: 0,
                    y: 30
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.8,
                    delay: 0.35,
                    ease: "easeOut"
                }}
                onSubmit={handleSearch}
                className="
                    absolute
                    z-30
                    left-1/2
                    -translate-x-1/2
                    bottom-6
                    w-[calc(100%-32px)]
                    max-w-[1050px]
                    bg-white
                    rounded-[22px]
                    md:rounded-full
                    p-2
                    shadow-[0_20px_50px_rgba(0,0,0,0.22)]
                    border border-white/80
                    flex flex-col
                    md:flex-row
                    items-stretch
                    md:items-center
                "
            >

                {/* =====================================================
                    LOCATION
                ===================================================== */}

                <div
                    className="
                        flex-1
                        px-5
                        py-3
                        md:py-2
                        border-b
                        md:border-b-0
                        md:border-r
                        border-gray-200
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-9 h-9
                                rounded-full
                                bg-emerald-50
                                flex items-center justify-center
                                shrink-0
                            "
                        >
                            <span className="text-emerald-700 text-base">
                                📍
                            </span>
                        </div>


                        <div className="flex flex-col w-full">

                            <label
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-gray-400
                                "
                            >
                                Destination
                            </label>


                            <select
                                required
                                value={pickupLocation}
                                onChange={(e) =>
                                    setPickupLocation(e.target.value)
                                }
                                className="
                                    bg-transparent
                                    outline-none
                                    text-sm
                                    font-medium
                                    text-gray-800
                                    cursor-pointer
                                    mt-1
                                    w-full
                                "
                            >

                                <option value="">
                                    Where are you going?
                                </option>

                                {indianLocations.map((location) => (
                                    <option
                                        key={location}
                                        value={location}
                                    >
                                        {location}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    PICKUP
                ===================================================== */}

                <div
                    className="
                        flex-1
                        px-5
                        py-3
                        md:py-2
                        border-b
                        md:border-b-0
                        md:border-r
                        border-gray-200
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-9 h-9
                                rounded-full
                                bg-emerald-50
                                flex items-center justify-center
                                shrink-0
                            "
                        >
                            <span className="text-emerald-700 text-base">
                                📅
                            </span>
                        </div>


                        <div className="flex flex-col w-full">

                            <label
                                htmlFor="pickup-date"
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-gray-400
                                "
                            >
                                Pick-up
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
                                required
                                className="
                                    bg-transparent
                                    outline-none
                                    text-sm
                                    font-medium
                                    text-gray-800
                                    mt-1
                                    w-full
                                "
                            />

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    RETURN
                ===================================================== */}

                <div
                    className="
                        flex-1
                        px-5
                        py-3
                        md:py-2
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-9 h-9
                                rounded-full
                                bg-emerald-50
                                flex items-center justify-center
                                shrink-0
                            "
                        >
                            <span className="text-emerald-700 text-base">
                                📅
                            </span>
                        </div>


                        <div className="flex flex-col w-full">

                            <label
                                htmlFor="return-date"
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-gray-400
                                "
                            >
                                Return
                            </label>


                            <input
                                value={returnDate}
                                onChange={(e) =>
                                    setReturnDate(e.target.value)
                                }
                                type="date"
                                id="return-date"
                                min={pickupDate || undefined}
                                required
                                className="
                                    bg-transparent
                                    outline-none
                                    text-sm
                                    font-medium
                                    text-gray-800
                                    mt-1
                                    w-full
                                "
                            />

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    SEARCH BUTTON
                ===================================================== */}

                <motion.button
                    whileHover={{
                        scale: 1.02
                    }}
                    whileTap={{
                        scale: 0.97
                    }}
                    type="submit"
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-[#123c32]
                        hover:bg-[#0d3028]
                        text-white
                        font-semibold
                        px-8
                        py-4
                        rounded-xl
                        md:rounded-full
                        cursor-pointer
                        transition-all
                        whitespace-nowrap
                        shadow-sm
                    "
                >

                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="w-4 brightness-0 invert"
                    />

                    Search RVs

                </motion.button>

            </motion.form>

        </section>
    );
};

export default Hero;