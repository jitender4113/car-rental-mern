import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        user,
        token,
        myCars,
        setShowLogin,
        logout,
    } = useAppContext();

    const [showProfile, setShowProfile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const hasListedRV =
        Array.isArray(myCars) && myCars.length > 0;

    // =====================================================
    // PROFILE
    // =====================================================

    const handleProfile = () => {
        if (!token) {
            setShowLogin(true);
            return;
        }

        navigate("/profile/dashboard");

        setShowProfile(false);
        setShowMobileMenu(false);
    };

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        setShowProfile(false);
        setShowMobileMenu(false);
        logout();
    };

    // =====================================================
    // PROFILE SECTION NAVIGATION
    // =====================================================

    const goToProfile = (path) => {
        navigate(path);
        setShowProfile(false);
        setShowMobileMenu(false);
    };

    // =====================================================
    // ACTIVE NAV
    // =====================================================

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(path);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8e4]">

            <div className="max-w-7xl mx-auto px-5 md:px-8 h-[78px] flex items-center justify-between">

                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to="/"
                    className="flex items-center shrink-0"
                    onClick={() => setShowMobileMenu(false)}
                >
                    <img
                        src={assets.logo}
                        alt="HomeOnWheels"
                        className="w-[195px] md:w-[225px] lg:w-[215px] h-auto object-contain"
                    />
                </Link>


                {/* =================================================
                    DESKTOP NAVIGATION
                    CENTERED
                ================================================= */}

                <div className="hidden md:flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2">

                    <Link
                        to="/"
                        className={`text-sm font-medium transition ${
                            isActive("/")
                                ? "text-[#123c32] font-semibold"
                                : "text-gray-500 hover:text-[#123c32]"
                        }`}
                    >
                        Home
                    </Link>


                    <Link
                        to="/cars"
                        className={`text-sm font-medium transition ${
                            isActive("/cars")
                                ? "text-[#123c32] font-semibold"
                                : "text-gray-500 hover:text-[#123c32]"
                        }`}
                    >
                        Caravans
                    </Link>


                    <Link
                        to="/owner/add-car"
                        className={`text-sm font-medium transition ${
                            isActive("/owner/add-car")
                                ? "text-[#123c32] font-semibold"
                                : "text-gray-500 hover:text-[#123c32]"
                        }`}
                    >
                        List Your RV
                    </Link>

                </div>


                {/* =================================================
                    DESKTOP RIGHT
                ================================================= */}

                <div className="hidden md:flex items-center ml-auto">

                    {/* PROFILE */}

                    <div className="relative">

                        <button
                            onClick={() => {

                                if (!token) {
                                    setShowLogin(true);
                                    return;
                                }

                                setShowProfile((prev) => !prev);

                            }}
                            className="flex items-center gap-2.5"
                        >

                            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#e8efeb] flex items-center justify-center border border-[#dce5df]">

                                {user?.image ? (

                                    <img
                                        src={user.image}
                                        alt={user.name || "Profile"}
                                        className="w-full h-full object-cover"
                                    />

                                ) : (

                                    <span className="text-sm text-[#123c32]">
                                        👤
                                    </span>

                                )}

                            </div>


                            {token && (
                                <span className="text-sm font-medium text-[#17211d] max-w-[100px] truncate">
                                    {user?.name || "Profile"}
                                </span>
                            )}


                            <span className="text-xs text-gray-400">
                                ▾
                            </span>

                        </button>


                        {/* =================================================
                            PROFILE DROPDOWN
                        ================================================= */}

                        <AnimatePresence>

                            {showProfile && token && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    transition={{
                                        duration: 0.15,
                                    }}
                                    className="
                                        absolute
                                        right-0
                                        top-12
                                        w-60
                                        bg-white
                                        border
                                        border-[#e2e8e4]
                                        rounded-2xl
                                        shadow-xl
                                        overflow-hidden
                                    "
                                >

                                    {/* USER INFO */}

                                    <div className="px-4 py-4 border-b border-[#e2e8e4]">

                                        <p className="text-sm font-semibold text-[#17211d] truncate">
                                            {user?.name}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1 truncate">
                                            {user?.email}
                                        </p>

                                    </div>


                                    {/* MENU */}

                                    <div className="p-2">

                                        {/* DASHBOARD */}

                                        <button
                                            onClick={() =>
                                                goToProfile(
                                                    "/profile/dashboard"
                                                )
                                            }
                                            className="
                                                w-full
                                                text-left
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                text-gray-600
                                                hover:bg-[#f1f5f2]
                                                hover:text-[#123c32]
                                                transition
                                            "
                                        >
                                            Dashboard
                                        </button>


                                        {/* MANAGE CARAVANS */}

                                        {hasListedRV && (

                                            <button
                                                onClick={() =>
                                                    goToProfile(
                                                        "/profile/manage-cars"
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    text-left
                                                    px-3
                                                    py-2.5
                                                    rounded-xl
                                                    text-sm
                                                    text-gray-600
                                                    hover:bg-[#f1f5f2]
                                                    hover:text-[#123c32]
                                                    transition
                                                "
                                            >
                                                Manage Caravans
                                            </button>

                                        )}


                                        {/* MANAGE BOOKINGS */}

                                        {hasListedRV && (

                                            <button
                                                onClick={() =>
                                                    goToProfile(
                                                        "/profile/manage-bookings"
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    text-left
                                                    px-3
                                                    py-2.5
                                                    rounded-xl
                                                    text-sm
                                                    text-gray-600
                                                    hover:bg-[#f1f5f2]
                                                    hover:text-[#123c32]
                                                    transition
                                                "
                                            >
                                                Manage Bookings
                                            </button>

                                        )}


                                        {/* MY BOOKINGS */}

                                        <button
                                            onClick={() =>
                                                goToProfile(
                                                    "/profile/my-bookings"
                                                )
                                            }
                                            className="
                                                w-full
                                                text-left
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                text-gray-600
                                                hover:bg-[#f1f5f2]
                                                hover:text-[#123c32]
                                                transition
                                            "
                                        >
                                            My Bookings
                                        </button>


                                        {/* LIST YOUR RV
                                            ONLY IF USER HAS NO RV */}

                                        {!hasListedRV && (

                                            <button
                                                onClick={() => {

                                                    navigate(
                                                        "/owner/add-car"
                                                    );

                                                    setShowProfile(false);

                                                }}
                                                className="
                                                    w-full
                                                    text-left
                                                    px-3
                                                    py-2.5
                                                    rounded-xl
                                                    text-sm
                                                    text-gray-600
                                                    hover:bg-[#f1f5f2]
                                                    hover:text-[#123c32]
                                                    transition
                                                "
                                            >
                                                List Your RV
                                            </button>

                                        )}

                                    </div>


                                    {/* LOGOUT */}

                                    <div className="border-t border-[#e2e8e4] p-2">

                                        <button
                                            onClick={handleLogout}
                                            className="
                                                w-full
                                                text-left
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                text-red-500
                                                hover:bg-red-50
                                                transition
                                            "
                                        >
                                            Logout
                                        </button>

                                    </div>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>

                </div>


                {/* =================================================
                    MOBILE RIGHT
                ================================================= */}

                <div className="md:hidden flex items-center gap-3">

                    {/* PROFILE */}

                    <button
                        onClick={handleProfile}
                        className="
                            w-9
                            h-9
                            rounded-full
                            overflow-hidden
                            bg-[#e8efeb]
                            flex
                            items-center
                            justify-center
                            border
                            border-[#dce5df]
                        "
                    >

                        {user?.image ? (

                            <img
                                src={user.image}
                                alt={user.name || "Profile"}
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            <span className="text-sm">
                                👤
                            </span>

                        )}

                    </button>


                    {/* MOBILE MENU */}

                    <button
                        onClick={() =>
                            setShowMobileMenu((prev) => !prev)
                        }
                        className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            border-[#e2e8e4]
                            flex
                            items-center
                            justify-center
                            text-[#123c32]
                        "
                        aria-label="Open menu"
                    >
                        {showMobileMenu ? "✕" : "☰"}
                    </button>

                </div>

            </div>


            {/* =====================================================
                MOBILE MENU
            ===================================================== */}

            <AnimatePresence>

                {showMobileMenu && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        className="
                            md:hidden
                            border-t
                            border-[#e2e8e4]
                            bg-white
                            overflow-hidden
                        "
                    >

                        <div className="px-5 py-4 space-y-1">

                            {/* HOME */}

                            <Link
                                to="/"
                                onClick={() =>
                                    setShowMobileMenu(false)
                                }
                                className="
                                    block
                                    px-3
                                    py-3
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    text-gray-600
                                    hover:bg-[#f1f5f2]
                                "
                            >
                                Home
                            </Link>


                            {/* CARAVANS */}

                            <Link
                                to="/cars"
                                onClick={() =>
                                    setShowMobileMenu(false)
                                }
                                className="
                                    block
                                    px-3
                                    py-3
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    text-gray-600
                                    hover:bg-[#f1f5f2]
                                "
                            >
                                Caravans
                            </Link>


                            {/* LIST YOUR RV */}

                            <Link
                                to="/owner/add-car"
                                onClick={() =>
                                    setShowMobileMenu(false)
                                }
                                className="
                                    block
                                    px-3
                                    py-3
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    text-gray-600
                                    hover:bg-[#f1f5f2]
                                "
                            >
                                List Your RV
                            </Link>


                            {/* LOGGED IN OPTIONS */}

                            {token && (

                                <>

                                    {/* DASHBOARD */}

                                    <button
                                        onClick={handleProfile}
                                        className="
                                            w-full
                                            text-left
                                            px-3
                                            py-3
                                            rounded-xl
                                            text-sm
                                            font-medium
                                            text-gray-600
                                            hover:bg-[#f1f5f2]
                                        "
                                    >
                                        Dashboard
                                    </button>


                                    {/* MANAGE CARAVANS */}

                                    {hasListedRV && (

                                        <button
                                            onClick={() =>
                                                goToProfile(
                                                    "/profile/manage-cars"
                                                )
                                            }
                                            className="
                                                w-full
                                                text-left
                                                px-3
                                                py-3
                                                rounded-xl
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                hover:bg-[#f1f5f2]
                                            "
                                        >
                                            Manage Caravans
                                        </button>

                                    )}


                                    {/* MANAGE BOOKINGS */}

                                    {hasListedRV && (

                                        <button
                                            onClick={() =>
                                                goToProfile(
                                                    "/profile/manage-bookings"
                                                )
                                            }
                                            className="
                                                w-full
                                                text-left
                                                px-3
                                                py-3
                                                rounded-xl
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                hover:bg-[#f1f5f2]
                                            "
                                        >
                                            Manage Bookings
                                        </button>

                                    )}


                                    {/* MY BOOKINGS */}

                                    <button
                                        onClick={() =>
                                            goToProfile(
                                                "/profile/my-bookings"
                                            )
                                        }
                                        className="
                                            w-full
                                            text-left
                                            px-3
                                            py-3
                                            rounded-xl
                                            text-sm
                                            font-medium
                                            text-gray-600
                                            hover:bg-[#f1f5f2]
                                        "
                                    >
                                        My Bookings
                                    </button>


                                    {/* LIST YOUR RV
                                        ONLY IF USER HAS NO RV */}

                                    {!hasListedRV && (

                                        <button
                                            onClick={() => {

                                                navigate(
                                                    "/owner/add-car"
                                                );

                                                setShowMobileMenu(false);

                                            }}
                                            className="
                                                w-full
                                                text-left
                                                px-3
                                                py-3
                                                rounded-xl
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                hover:bg-[#f1f5f2]
                                            "
                                        >
                                            List Your RV
                                        </button>

                                    )}


                                    {/* LOGOUT */}

                                    <button
                                        onClick={handleLogout}
                                        className="
                                            w-full
                                            text-left
                                            px-3
                                            py-3
                                            rounded-xl
                                            text-sm
                                            font-medium
                                            text-red-500
                                            hover:bg-red-50
                                        "
                                    >
                                        Logout
                                    </button>

                                </>

                            )}

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </nav>
    );
};

export default Navbar;