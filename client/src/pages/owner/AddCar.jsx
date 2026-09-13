import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const AddCar = () => {
    const {
        axios,
        currency,
        token,
        setShowLogin,
    } = useAppContext();

    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [car, setCar] = useState({
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        category: "",
        vehicleType: "",
        sleeps: "",
        amenities: [],
        location: "",
        description: "",
    });

    const [isCustomVehicleType, setIsCustomVehicleType] = useState(false);
    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [isCustomLocation, setIsCustomLocation] = useState(false);

    const [customVehicleType, setCustomVehicleType] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [customLocation, setCustomLocation] = useState("");

    // =====================================================
    // AMENITIES
    // =====================================================

    const amenityCategories = [
        {
            title: "Kitchen & Appliances",
            items: [
                "Kitchen",
                "Refrigerator",
                "Freezer",
                "Microwave",
                "Oven",
                "Stove / Cooktop",
                "Coffee Maker",
                "Electric Kettle",
                "Toaster",
                "Dishwasher",
                "Dining Table",
                "Kitchen Sink",
            ],
        },
        {
            title: "Bathroom & Cleaning",
            items: [
                "Toilet",
                "Shower",
                "Hot Water",
                "Bathroom Sink",
                "Washing Machine",
                "Dryer",
                "Hair Dryer",
            ],
        },
        {
            title: "Sleeping & Comfort",
            items: [
                "Bed",
                "Bunk Beds",
                "Sofa Bed",
                "Bed Linen",
                "Blankets",
                "Pillows",
                "Air Conditioning",
                "Heating",
                "Ceiling Fan",
            ],
        },
        {
            title: "Power & Utilities",
            items: [
                "Generator",
                "Solar Power",
                "Inverter",
                "Shore Power",
                "USB Charging",
                "Power Outlets",
                "Battery Backup",
            ],
        },
        {
            title: "Entertainment & Connectivity",
            items: [
                "TV",
                "Wi-Fi",
                "Bluetooth",
                "Streaming Services",
                "Radio",
                "Sound System",
                "Board Games",
            ],
        },
        {
            title: "Outdoor",
            items: [
                "Awning",
                "Outdoor Chairs",
                "Outdoor Table",
                "BBQ / Grill",
                "Outdoor Shower",
                "Bike Rack",
                "Roof Rack",
                "Camping Equipment",
                "Outdoor Lighting",
            ],
        },
        {
            title: "Driving & Towing",
            items: [
                "Rear Camera",
                "Cruise Control",
                "GPS",
                "Parking Sensors",
                "Tow Hitch",
                "Electric Brakes",
                "Stabilizer Jacks",
            ],
        },
        {
            title: "Safety & Extras",
            items: [
                "Pet Friendly",
                "Child Friendly",
                "Wheelchair Accessible",
                "Storage Space",
                "Fire Extinguisher",
                "Smoke Detector",
                "Carbon Monoxide Detector",
                "First Aid Kit",
            ],
        },
    ];

    // =====================================================
    // CATEGORIES
    // =====================================================

    const categories = [
        "Class A Motorhome",
        "Class B Motorhome",
        "Class C Motorhome",
        "Travel Trailer",
        "Fifth Wheel",
        "Pop-up Camper",
        "Camper Van",
    ];

    // =====================================================
    // INDIAN LOCATIONS
    // =====================================================

    const locations = [
        "Delhi, India",
        "Gurugram, Haryana",
        "Noida, Uttar Pradesh",
        "Chandigarh, India",
        "Jaipur, Rajasthan",
        "Udaipur, Rajasthan",
        "Jaisalmer, Rajasthan",
        "Jodhpur, Rajasthan",
        "Agra, Uttar Pradesh",
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
        "Lucknow, Uttar Pradesh",
        "Varanasi, Uttar Pradesh",
        "Bhopal, Madhya Pradesh",
        "Indore, Madhya Pradesh",
        "Nagpur, Maharashtra",
        "Patna, Bihar",
        "Ranchi, Jharkhand",
        "Guwahati, Assam",
    ];

    // =====================================================
    // HANDLERS
    // =====================================================

    const handleChange = (field, value) => {
        setCar((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleAmenity = (amenity) => {
        setCar((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((item) => item !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    const resetCustomFields = () => {
        setIsCustomVehicleType(false);
        setIsCustomCategory(false);
        setIsCustomLocation(false);

        setCustomVehicleType("");
        setCustomCategory("");
        setCustomLocation("");
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Anyone can open and fill the form,
        // but login is required before submitting.

        if (!token) {
            toast("Please login to list your RV");
            setShowLogin(true);
            return;
        }

        if (isLoading) return;

        // =================================================
        // FORM VALIDATION
        // =================================================

        if (!image) {
            toast.error("Please upload an RV image");
            return;
        }

        if (!car.vehicleType.trim()) {
            toast.error("Please select or enter a vehicle type");
            return;
        }

        if (!car.category.trim()) {
            toast.error("Please select or enter a category");
            return;
        }

        if (!car.location.trim()) {
            toast.error("Please select or enter a location");
            return;
        }

        if (car.amenities.length === 0) {
            toast.error("Please select at least one amenity");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();

            formData.append("image", image);
            formData.append("carData", JSON.stringify(car));

            const { data } = await axios.post(
                "/api/owner/add-car",
                formData
            );

            if (data.success) {
                toast.success(
                    data.message || "RV listed successfully!"
                );

                setImage(null);

                setCar({
                    brand: "",
                    model: "",
                    year: "",
                    pricePerDay: "",
                    category: "",
                    vehicleType: "",
                    sleeps: "",
                    amenities: [],
                    location: "",
                    description: "",
                });

                resetCustomFields();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Unable to list your RV";

            if (
                message.toLowerCase().includes("not authorized") ||
                error.response?.status === 401
            ) {
                toast("Please login to list your RV");
                setShowLogin(true);
                return;
            }

            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full px-4 md:px-8 lg:px-10 py-8 md:py-10 bg-[#fafbf9] min-h-screen">

            <div className="w-full max-w-5xl mx-auto">

                {/* =====================================================
                    RV HOST HERO / HEADER
                ===================================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[24px]
                        bg-[#123c32]
                        text-white
                        px-6
                        md:px-10
                        py-8
                        md:py-9
                        mb-8
                    "
                >

                    <div
                        className="
                            absolute
                            -right-20
                            -top-24
                            w-64
                            h-64
                            rounded-full
                            border
                            border-white/10
                        "
                    />

                    <div
                        className="
                            absolute
                            right-8
                            -bottom-32
                            w-72
                            h-72
                            rounded-full
                            border
                            border-[#c6a15b]/20
                        "
                    />

                    <div
                        className="
                            absolute
                            right-32
                            top-8
                            w-20
                            h-20
                            rounded-full
                            bg-[#c6a15b]/10
                            blur-2xl
                        "
                    />

                    <div className="relative z-10 max-w-3xl">

                        <div className="flex items-center gap-3 mb-4">

                            <span className="w-9 h-[2px] bg-[#c6a15b]" />

                            <span
                                className="
                                    text-[10px]
                                    md:text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.22em]
                                    text-[#d8c18b]
                                "
                            >
                                Become an RV Host
                            </span>

                        </div>

                        <h1
                            className="
                                text-3xl
                                md:text-4xl
                                lg:text-5xl
                                font-semibold
                                tracking-tight
                                leading-tight
                            "
                        >
                            Turn Your RV Into
                            <span className="block text-[#d8c18b]">
                                Your Next Income.
                            </span>
                        </h1>

                        <p
                            className="
                                mt-4
                                text-sm
                                md:text-base
                                text-white/70
                                leading-6
                                md:leading-7
                                max-w-2xl
                            "
                        >
                            Have a caravan, camper van or motorhome sitting
                            unused? List it on our marketplace and let
                            travelers enjoy the freedom of the open road
                            while you earn from your vehicle.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-6">

                            {[
                                "List your RV",
                                "Set your own price",
                                "Earn from bookings",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        px-3.5
                                        py-2.5
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/10
                                    "
                                >
                                    <span
                                        className="
                                            w-6
                                            h-6
                                            rounded-full
                                            bg-[#c6a15b]
                                            text-[#123c32]
                                            flex
                                            items-center
                                            justify-center
                                            text-xs
                                            font-bold
                                        "
                                    >
                                        ✓
                                    </span>

                                    <span className="text-xs font-medium text-white/90">
                                        {item}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>

                </motion.div>


                {/* =====================================================
                    FORM
                ===================================================== */}

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={onSubmitHandler}
                    className="
                        bg-white
                        border
                        border-[#e3e8e5]
                        rounded-[24px]
                        p-5
                        md:p-8
                        shadow-[0_10px_35px_rgba(30,40,35,0.04)]
                    "
                >

                    {/* =====================================================
                        IMAGE
                    ===================================================== */}

                    <div className="mb-8">

                        <div
                            className="
                                flex
                                items-center
                                gap-5
                                p-4
                                rounded-2xl
                                bg-[#f5f8f6]
                                border
                                border-[#e3e9e6]
                            "
                        >

                            <label
                                htmlFor="rv-image"
                                className="
                                    relative
                                    w-28
                                    h-20
                                    rounded-xl
                                    overflow-hidden
                                    shrink-0
                                    cursor-pointer
                                    bg-white
                                    border
                                    border-[#dfe6e2]
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <img
                                    src={
                                        image
                                            ? URL.createObjectURL(image)
                                            : assets.upload_icon
                                    }
                                    alt=""
                                    className={
                                        image
                                            ? "w-full h-full object-cover"
                                            : "w-8 opacity-50"
                                    }
                                />

                                {image && (
                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-black/20
                                            opacity-0
                                            hover:opacity-100
                                            flex
                                            items-center
                                            justify-center
                                            text-white
                                            text-xs
                                            transition-opacity
                                        "
                                    >
                                        Change
                                    </div>
                                )}

                                <input
                                    type="file"
                                    id="rv-image"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                        setImage(
                                            e.target.files?.[0] || null
                                        );
                                    }}
                                />

                            </label>

                            <div>

                                <p className="text-sm font-semibold text-[#17211d]">
                                    RV Cover Image
                                </p>

                                <p className="text-xs text-gray-400 mt-1 leading-5">
                                    Upload a clear, high-quality photo of your
                                    caravan or RV.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        BASIC INFORMATION
                    ===================================================== */}

                    <div className="mb-8">

                        <div className="flex items-center gap-3 mb-5">

                            <span
                                className="
                                    w-7
                                    h-7
                                    rounded-lg
                                    bg-[#123c32]
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    text-xs
                                    font-semibold
                                "
                            >
                                01
                            </span>

                            <h2 className="text-base font-semibold text-[#17211d]">
                                Basic Information
                            </h2>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* BRAND */}

                            <div className="flex flex-col">

                                <label className="text-xs font-medium text-gray-600">
                                    Brand
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Winnebago, Airstream"
                                    required
                                    value={car.brand}
                                    onChange={(e) =>
                                        handleChange(
                                            "brand",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        px-4
                                        py-3
                                        mt-2
                                        border
                                        border-[#dfe5e1]
                                        rounded-xl
                                        outline-none
                                        text-sm
                                        text-gray-700
                                        focus:border-[#123c32]
                                        focus:ring-2
                                        focus:ring-[#123c32]/10
                                        transition-all
                                    "
                                />

                            </div>


                            {/* MODEL */}

                            <div className="flex flex-col">

                                <label className="text-xs font-medium text-gray-600">
                                    Model
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Vista 29VE, Classic"
                                    required
                                    value={car.model}
                                    onChange={(e) =>
                                        handleChange(
                                            "model",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        px-4
                                        py-3
                                        mt-2
                                        border
                                        border-[#dfe5e1]
                                        rounded-xl
                                        outline-none
                                        text-sm
                                        text-gray-700
                                        focus:border-[#123c32]
                                        focus:ring-2
                                        focus:ring-[#123c32]/10
                                        transition-all
                                    "
                                />

                            </div>


                            {/* YEAR */}

                            <div className="flex flex-col">

                                <label className="text-xs font-medium text-gray-600">
                                    Model Year
                                </label>

                                <input
                                    type="number"
                                    placeholder="2025"
                                    min="1990"
                                    max={new Date().getFullYear() + 1}
                                    required
                                    value={car.year}
                                    onChange={(e) =>
                                        handleChange(
                                            "year",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        px-4
                                        py-3
                                        mt-2
                                        border
                                        border-[#dfe5e1]
                                        rounded-xl
                                        outline-none
                                        text-sm
                                        text-gray-700
                                        focus:border-[#123c32]
                                        focus:ring-2
                                        focus:ring-[#123c32]/10
                                        transition-all
                                    "
                                />

                            </div>


                            {/* PRICE */}

                            <div className="flex flex-col">

                                <label className="text-xs font-medium text-gray-600">
                                    Daily Rental Price ({currency})
                                </label>

                                <input
                                    type="number"
                                    placeholder="8500"
                                    min="1"
                                    required
                                    value={car.pricePerDay}
                                    onChange={(e) =>
                                        handleChange(
                                            "pricePerDay",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        px-4
                                        py-3
                                        mt-2
                                        border
                                        border-[#dfe5e1]
                                        rounded-xl
                                        outline-none
                                        text-sm
                                        text-gray-700
                                        focus:border-[#123c32]
                                        focus:ring-2
                                        focus:ring-[#123c32]/10
                                        transition-all
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        RV DETAILS
                    ===================================================== */}

                    <div className="mb-8">

                        <div className="flex items-center gap-3 mb-5">

                            <span
                                className="
                                    w-7
                                    h-7
                                    rounded-lg
                                    bg-[#123c32]
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    text-xs
                                    font-semibold
                                "
                            >
                                02
                            </span>

                            <h2 className="text-base font-semibold text-[#17211d]">
                                RV Details
                            </h2>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                            {/* VEHICLE TYPE */}

                            <div className="flex flex-col">

                                <label className="text-xs font-medium text-gray-600">
                                    Vehicle Type
                                </label>

                                {!isCustomVehicleType ? (
                                    <select
                                        required
                                        value={car.vehicleType}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (value === "__custom__") {
                                                setIsCustomVehicleType(true);
                                                setCustomVehicleType("");

                                                handleChange(
                                                    "vehicleType",
                                                    ""
                                                );
                                            } else {
                                                handleChange(
                                                    "vehicleType",
                                                    value
                                                );
                                            }
                                        }}
                                        className="
                                            px-4
                                            py-3
                                            mt-2
                                            border
                                            border-[#dfe5e1]
                                            rounded-xl
                                            outline-none
                                            text-sm
                                            text-gray-700
                                            bg-white
                                            focus:border-[#123c32]
                                            focus:ring-2
                                            focus:ring-[#123c32]/10
                                        "
                                    >

                                        <option value="">
                                            Select type
                                        </option>

                                        <option value="Motorhome">
                                            Motorhome
                                        </option>

                                        <option value="Towable">
                                            Towable
                                        </option>

                                        <option value="__custom__">
                                            + Add Custom Vehicle Type
                                        </option>

                                    </select>
                                ) : (
                                    <div className="flex gap-2 mt-2">

                                        <input
                                            type="text"
                                            required
                                            autoFocus
                                            placeholder="Enter vehicle type"
                                            value={customVehicleType}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                setCustomVehicleType(value);

                                                handleChange(
                                                    "vehicleType",
                                                    value
                                                );
                                            }}
                                            className="
                                                flex-1
                                                min-w-0
                                                px-4
                                                py-3
                                                border
                                                border-[#dfe5e1]
                                                rounded-xl
                                                outline-none
                                                text-sm
                                                text-gray-700
                                                focus:border-[#123c32]
                                                focus:ring-2
                                                focus:ring-[#123c32]/10
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCustomVehicleType(false);
                                                setCustomVehicleType("");

                                                handleChange(
                                                    "vehicleType",
                                                    ""
                                                );
                                            }}
                                            className="
                                                px-3
                                                rounded-xl
                                                border
                                                border-[#dfe5e1]
                                                text-xs
                                                text-gray-500
                                                hover:bg-gray-50
                                            "
                                        >
                                            Back
                                        </button>

                                    </div>
                                )}

                            </div>


                            {/* CATEGORY */}

                            <div className="flex flex-col">

                                <label className="text-xs font-medium text-gray-600">
                                    Category
                                </label>

                                {!isCustomCategory ? (
                                    <select
                                        required
                                        value={car.category}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (value === "__custom__") {
                                                setIsCustomCategory(true);
                                                setCustomCategory("");

                                                handleChange(
                                                    "category",
                                                    ""
                                                );
                                            } else {
                                                handleChange(
                                                    "category",
                                                    value
                                                );
                                            }
                                        }}
                                        className="
                                            px-4
                                            py-3
                                            mt-2
                                            border
                                            border-[#dfe5e1]
                                            rounded-xl
                                            outline-none
                                            text-sm
                                            text-gray-700
                                            bg-white
                                            focus:border-[#123c32]
                                            focus:ring-2
                                            focus:ring-[#123c32]/10
                                        "
                                    >

                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}

                                        <option value="__custom__">
                                            + Add Custom Category
                                        </option>

                                    </select>
                                ) : (
                                    <div className="flex gap-2 mt-2">

                                        <input
                                            type="text"
                                            required
                                            autoFocus
                                            placeholder="Enter custom category"
                                            value={customCategory}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                setCustomCategory(value);

                                                handleChange(
                                                    "category",
                                                    value
                                                );
                                            }}
                                            className="
                                                flex-1
                                                min-w-0
                                                px-4
                                                py-3
                                                border
                                                border-[#dfe5e1]
                                                rounded-xl
                                                outline-none
                                                text-sm
                                                text-gray-700
                                                focus:border-[#123c32]
                                                focus:ring-2
                                                focus:ring-[#123c32]/10
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCustomCategory(false);
                                                setCustomCategory("");

                                                handleChange(
                                                    "category",
                                                    ""
                                                );
                                            }}
                                            className="
                                                px-3
                                                rounded-xl
                                                border
                                                border-[#dfe5e1]
                                                text-xs
                                                text-gray-500
                                                hover:bg-gray-50
                                            "
                                        >
                                            Back
                                        </button>

                                    </div>
                                )}

                            </div>


                            {/* SLEEPS */}

                            <div className="flex flex-col">

                                <label className="text-xs font-medium text-gray-600">
                                    Sleeps
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    placeholder="6"
                                    required
                                    value={car.sleeps}
                                    onChange={(e) =>
                                        handleChange(
                                            "sleeps",
                                            e.target.value
                                        )
                                    }
                                    className="
                                        px-4
                                        py-3
                                        mt-2
                                        border
                                        border-[#dfe5e1]
                                        rounded-xl
                                        outline-none
                                        text-sm
                                        text-gray-700
                                        focus:border-[#123c32]
                                        focus:ring-2
                                        focus:ring-[#123c32]/10
                                        transition-all
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        AMENITIES
                    ===================================================== */}

                    <div className="mb-8">

                        <div className="flex items-center gap-3 mb-2">

                            <span
                                className="
                                    w-7
                                    h-7
                                    rounded-lg
                                    bg-[#123c32]
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    text-xs
                                    font-semibold
                                "
                            >
                                03
                            </span>

                            <h2 className="text-base font-semibold text-[#17211d]">
                                Amenities & Features
                            </h2>

                        </div>

                        <p className="text-xs text-gray-400 mb-6 ml-10">
                            Select all facilities and features available with
                            your RV.
                        </p>


                        <div className="space-y-7">

                            {amenityCategories.map((category) => (
                                <div key={category.title}>

                                    <div className="flex items-center gap-2 mb-3">

                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c6a15b]" />

                                        <h3
                                            className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-[0.08em]
                                                text-[#123c32]
                                            "
                                        >
                                            {category.title}
                                        </h3>

                                    </div>


                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">

                                        {category.items.map((amenity) => {

                                            const selected =
                                                car.amenities.includes(
                                                    amenity
                                                );

                                            return (
                                                <button
                                                    key={amenity}
                                                    type="button"
                                                    onClick={() =>
                                                        toggleAmenity(
                                                            amenity
                                                        )
                                                    }
                                                    className={
                                                        selected
                                                            ? `
                                                                flex
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-3
                                                                rounded-xl
                                                                border
                                                                text-xs
                                                                text-left
                                                                transition-all
                                                                bg-[#eef5f1]
                                                                border-[#123c32]
                                                                text-[#123c32]
                                                                font-medium
                                                            `
                                                            : `
                                                                flex
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-3
                                                                rounded-xl
                                                                border
                                                                text-xs
                                                                text-left
                                                                transition-all
                                                                bg-white
                                                                border-[#e2e7e4]
                                                                text-gray-500
                                                                hover:border-[#b8c9c1]
                                                                hover:bg-[#fafcfb]
                                                            `
                                                    }
                                                >

                                                    <span
                                                        className={
                                                            selected
                                                                ? `
                                                                    w-4
                                                                    h-4
                                                                    rounded
                                                                    border
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    shrink-0
                                                                    text-[10px]
                                                                    bg-[#123c32]
                                                                    border-[#123c32]
                                                                    text-white
                                                                `
                                                                : `
                                                                    w-4
                                                                    h-4
                                                                    rounded
                                                                    border
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    shrink-0
                                                                    text-[10px]
                                                                    border-gray-300
                                                                `
                                                        }
                                                    >
                                                        {selected ? "✓" : ""}
                                                    </span>

                                                    <span>
                                                        {amenity}
                                                    </span>

                                                </button>
                                            );
                                        })}

                                    </div>

                                </div>
                            ))}

                        </div>


                        <div
                            className="
                                mt-5
                                flex
                                items-center
                                justify-between
                                px-4
                                py-3
                                rounded-xl
                                bg-[#f5f8f6]
                                border
                                border-[#e3e9e6]
                            "
                        >

                            <span className="text-xs text-gray-500">
                                Selected amenities
                            </span>

                            <span className="text-xs font-semibold text-[#123c32]">
                                {car.amenities.length} selected
                            </span>

                        </div>

                    </div>


                    {/* =====================================================
                        LOCATION & DESCRIPTION
                    ===================================================== */}

                    <div className="mb-8">

                        <div className="flex items-center gap-3 mb-5">

                            <span
                                className="
                                    w-7
                                    h-7
                                    rounded-lg
                                    bg-[#123c32]
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    text-xs
                                    font-semibold
                                "
                            >
                                04
                            </span>

                            <h2 className="text-base font-semibold text-[#17211d]">
                                Location & Description
                            </h2>

                        </div>


                        {/* LOCATION */}

                        <div className="flex flex-col mb-5">

                            <label className="text-xs font-medium text-gray-600">
                                Pickup Location
                            </label>

                            {!isCustomLocation ? (
                                <select
                                    required
                                    value={car.location}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "__custom__") {
                                            setIsCustomLocation(true);
                                            setCustomLocation("");

                                            handleChange(
                                                "location",
                                                ""
                                            );
                                        } else {
                                            handleChange(
                                                "location",
                                                value
                                            );
                                        }
                                    }}
                                    className="
                                        px-4
                                        py-3
                                        mt-2
                                        border
                                        border-[#dfe5e1]
                                        rounded-xl
                                        outline-none
                                        text-sm
                                        text-gray-700
                                        bg-white
                                        focus:border-[#123c32]
                                        focus:ring-2
                                        focus:ring-[#123c32]/10
                                    "
                                >

                                    <option value="">
                                        Select a pickup location
                                    </option>

                                    {locations.map((location) => (
                                        <option
                                            key={location}
                                            value={location}
                                        >
                                            {location}
                                        </option>
                                    ))}

                                    <option value="__custom__">
                                        + Add Custom Location
                                    </option>

                                </select>
                            ) : (
                                <div className="flex gap-2 mt-2">

                                    <input
                                        type="text"
                                        required
                                        autoFocus
                                        placeholder="Enter city, state or pickup location"
                                        value={customLocation}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setCustomLocation(value);

                                            handleChange(
                                                "location",
                                                value
                                            );
                                        }}
                                        className="
                                            flex-1
                                            min-w-0
                                            px-4
                                            py-3
                                            border
                                            border-[#dfe5e1]
                                            rounded-xl
                                            outline-none
                                            text-sm
                                            text-gray-700
                                            focus:border-[#123c32]
                                            focus:ring-2
                                            focus:ring-[#123c32]/10
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsCustomLocation(false);
                                            setCustomLocation("");

                                            handleChange(
                                                "location",
                                                ""
                                            );
                                        }}
                                        className="
                                            px-3
                                            rounded-xl
                                            border
                                            border-[#dfe5e1]
                                            text-xs
                                            text-gray-500
                                            hover:bg-gray-50
                                        "
                                    >
                                        Back
                                    </button>

                                </div>
                            )}

                        </div>


                        {/* DESCRIPTION */}

                        <div className="flex flex-col">

                            <label className="text-xs font-medium text-gray-600">
                                Description
                            </label>

                            <textarea
                                rows={5}
                                required
                                placeholder="Tell travelers what makes your RV special..."
                                value={car.description}
                                onChange={(e) =>
                                    handleChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="
                                    px-4
                                    py-3
                                    mt-2
                                    border
                                    border-[#dfe5e1]
                                    rounded-xl
                                    outline-none
                                    text-sm
                                    text-gray-700
                                    resize-none
                                    focus:border-[#123c32]
                                    focus:ring-2
                                    focus:ring-[#123c32]/10
                                    transition-all
                                "
                            />

                        </div>

                    </div>


                    {/* =====================================================
                        SUBMIT
                    ===================================================== */}

                    <div
                        className="
                            pt-6
                            border-t
                            border-[#e8ece9]
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-4
                        "
                    >

                        <div>

                            <p className="text-xs font-medium text-[#17211d]">
                                Ready to list your RV?
                            </p>

                            <p className="text-[11px] text-gray-400 mt-1">
                                Your listing will be available to travelers
                                after submission.
                            </p>

                        </div>


                        <motion.button
                            whileHover={{
                                y: -1,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            disabled={isLoading}
                            type="submit"
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-6
                                py-3
                                bg-[#123c32]
                                hover:bg-[#0d3028]
                                text-white
                                rounded-xl
                                text-sm
                                font-medium
                                transition-all
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >

                            <img
                                src={assets.tick_icon}
                                alt=""
                                className="w-4 brightness-0 invert"
                            />

                            {isLoading
                                ? "Listing..."
                                : "List Your RV"}

                        </motion.button>

                    </div>

                </motion.form>

            </div>

        </div>
    );
};

export default AddCar;