import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Cars = () => {
    const [searchParams] = useSearchParams();

    const pickupLocation = searchParams.get("pickupLocation");
    const pickupDate = searchParams.get("pickupDate");
    const returnDate = searchParams.get("returnDate");

    // IMPORTANT:
    // cars are public data and do NOT require login.
    const { cars, axios } = useAppContext();

    const [input, setInput] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);

    const isSearchData =
        pickupLocation && pickupDate && returnDate;

    // -----------------------------------------
    // Normal RV filtering
    // -----------------------------------------
    const applyFilter = (searchValue = input) => {
        if (!searchValue.trim()) {
            setFilteredCars(cars);
            return;
        }

        const search = searchValue.toLowerCase().trim();

        const filtered = cars.filter((car) => {
            return (
                car.brand?.toLowerCase().includes(search) ||
                car.model?.toLowerCase().includes(search) ||
                car.category?.toLowerCase().includes(search) ||
                car.vehicleType?.toLowerCase().includes(search) ||
                car.location?.toLowerCase().includes(search) ||
                car.amenities?.some((amenity) =>
                    amenity?.toLowerCase().includes(search)
                )
            );
        });

        setFilteredCars(filtered);
    };

    // -----------------------------------------
    // Check RV availability for dates/location
    // -----------------------------------------
    const searchRVAvailability = async () => {
        try {
            const { data } = await axios.post(
                "/api/bookings/check-availability",
                {
                    location: pickupLocation,
                    pickupDate,
                    returnDate,
                }
            );

            if (data.success) {
                setFilteredCars(data.availableCars || []);

                if ((data.availableCars || []).length === 0) {
                    toast("No RVs available for these dates");
                }
            } else {
                // If availability API fails logically,
                // keep public RV listings visible.
                setFilteredCars(cars);
            }
        } catch (error) {
            console.log(
                "Availability check error:",
                error.response?.data?.message || error.message
            );

            // Don't hide public RV listings because of
            // an availability API error.
            setFilteredCars(cars);

            toast.error(
                error.response?.data?.message ||
                "Unable to check availability"
            );
        }
    };

    // -----------------------------------------
    // Initial / updated public RV listings
    // -----------------------------------------
    useEffect(() => {
        if (!isSearchData) {
            applyFilter();
        }
    }, [cars]);

    // -----------------------------------------
    // Search input filter
    // -----------------------------------------
    useEffect(() => {
        if (!isSearchData) {
            applyFilter(input);
        }
    }, [input]);

    // -----------------------------------------
    // Search availability when coming from Hero
    // -----------------------------------------
    useEffect(() => {
        if (!isSearchData) return;

        // Wait until public RV data is loaded.
        if (cars.length === 0) {
            setFilteredCars([]);
            return;
        }

        searchRVAvailability();
    }, [
        pickupLocation,
        pickupDate,
        returnDate,
        cars.length,
    ]);

    return (
        <div className="bg-[#fafbf9] min-h-screen">

            {/* ================= HEADER ================= */}

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="
                    relative
                    overflow-hidden
                    bg-[#f1f5f2]
                    border-b border-[#e2e8e4]
                    px-6 md:px-16 lg:px-24 xl:px-32
                    py-20 md:py-24
                "
            >

                {/* Decorative circles */}

                <div
                    className="
                        absolute
                        -right-32
                        -top-32
                        w-[420px]
                        h-[420px]
                        rounded-full
                        border border-[#c6a15b]/15
                    "
                />

                <div
                    className="
                        absolute
                        -left-32
                        -bottom-40
                        w-[420px]
                        h-[420px]
                        rounded-full
                        bg-emerald-900/[0.025]
                        blur-3xl
                    "
                />

                <div className="relative z-10 flex flex-col items-center text-center">

                    <Title
                        title="Find Your Perfect RV"
                        subTitle="Explore beautifully equipped caravans and RVs ready for your next unforgettable journey."
                    />

                    {/* Search */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.25,
                            duration: 0.5,
                        }}
                        className="
                            flex items-center
                            bg-white
                            border border-[#e0e6e2]
                            px-5
                            mt-8
                            max-w-[620px]
                            w-full
                            h-14
                            rounded-2xl
                            shadow-[0_10px_30px_rgba(30,40,35,0.07)]
                            focus-within:border-[#123c32]
                            transition-all
                        "
                    >

                        <img
                            src={assets.search_icon}
                            alt=""
                            className="w-4.5 h-4.5 opacity-50 mr-3"
                        />

                        <input
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            value={input}
                            type="text"
                            placeholder="Search by RV name, type, location or amenities..."
                            className="
                                w-full
                                h-full
                                outline-none
                                text-sm
                                text-gray-700
                                placeholder:text-gray-400
                                bg-transparent
                            "
                        />

                        <div
                            className="
                                hidden sm:flex
                                items-center justify-center
                                w-9 h-9
                                rounded-xl
                                bg-[#eef5f1]
                            "
                        >
                            <img
                                src={assets.filter_icon}
                                alt=""
                                className="w-4 opacity-60"
                            />
                        </div>

                    </motion.div>

                </div>

            </motion.section>

            {/* ================= RV LIST ================= */}

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 0.3,
                    duration: 0.5,
                }}
                className="
                    px-6
                    md:px-16
                    lg:px-24
                    xl:px-32
                    py-12
                "
            >

                <div className="xl:px-20 max-w-7xl mx-auto">

                    {/* Result heading */}

                    <div
                        className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                            gap-3
                            mb-7
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-[10px]
                                    text-[#c6a15b]
                                    font-semibold
                                    tracking-[0.2em]
                                    uppercase
                                    mb-2
                                "
                            >
                                Explore our collection
                            </p>

                            <h2
                                className="
                                    text-2xl
                                    md:text-3xl
                                    font-semibold
                                    text-[#17211d]
                                "
                            >
                                Available RVs
                            </h2>

                        </div>

                        <p className="text-sm text-gray-400">
                            Showing{" "}
                            <span className="font-semibold text-[#123c32]">
                                {filteredCars.length}
                            </span>{" "}
                            RVs
                        </p>

                    </div>

                    {/* Search location info */}

                    {isSearchData && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                                mb-7
                                p-4
                                bg-white
                                border border-[#e2e8e4]
                                rounded-2xl
                            "
                        >

                            <span
                                className="
                                    px-3 py-1.5
                                    rounded-full
                                    bg-[#eef5f1]
                                    text-[#123c32]
                                    text-xs
                                    font-medium
                                "
                            >
                                📍 {pickupLocation}
                            </span>

                            <span className="text-xs text-gray-400">
                                {pickupDate}
                            </span>

                            <span className="text-gray-300">
                                →
                            </span>

                            <span className="text-xs text-gray-400">
                                {returnDate}
                            </span>

                        </motion.div>
                    )}

                    {/* Empty state */}

                    {filteredCars.length === 0 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                                flex flex-col
                                items-center
                                justify-center
                                py-24
                                bg-white
                                border border-[#e5e9e6]
                                rounded-[24px]
                            "
                        >

                            <div
                                className="
                                    w-16 h-16
                                    rounded-2xl
                                    bg-[#eef5f1]
                                    flex items-center justify-center
                                    text-2xl
                                    mb-5
                                "
                            >
                                🚐
                            </div>

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    text-[#17211d]
                                "
                            >
                                No RVs found
                            </h3>

                            <p
                                className="
                                    text-sm
                                    text-gray-400
                                    mt-2
                                    text-center
                                    max-w-sm
                                "
                            >
                                Try searching for another RV, location,
                                category or amenity.
                            </p>

                        </motion.div>
                    )}

                    {/* Cards */}

                    {filteredCars.length > 0 && (
                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-7
                            "
                        >

                            {filteredCars.map((car, index) => (
                                <motion.div
                                    key={car._id || index}
                                    initial={{
                                        opacity: 0,
                                        y: 25,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: Math.min(
                                            index * 0.06,
                                            0.4
                                        ),
                                        duration: 0.45,
                                    }}
                                >
                                    <CarCard car={car} />
                                </motion.div>
                            ))}

                        </div>
                    )}

                </div>

            </motion.section>

        </div>
    );
};

export default Cars;