import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import Sidebar from "../components/owner/Sidebar";

import Dashboard from "./owner/Dashboard";
import ManageCars from "./owner/ManageCars";
import ManageBookings from "./owner/ManageBookings";
import MyBookings from "./MyBookings";


/* =========================================================
   PROFILE
========================================================= */

const Profile = () => {

    const {
        user,
        token,
        loadingUser,
        logout,
        setShowLogin,
    } = useAppContext();


    /* =====================================================
       LOGIN CHECK
    ===================================================== */

    useEffect(() => {

        if (!token && !loadingUser) {
            setShowLogin(true);
        }

    }, [
        token,
        loadingUser,
        setShowLogin
    ]);


    /* =====================================================
       USER LOADING
    ===================================================== */

    if (loadingUser) {

        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#fafbf9]">

                <div className="flex items-center gap-3 text-[#123c32]">

                    <span className="w-5 h-5 border-2 border-[#123c32] border-t-transparent rounded-full animate-spin" />

                    <span className="text-sm font-medium">
                        Loading your profile...
                    </span>

                </div>

            </div>
        );

    }


    /* =====================================================
       NOT LOGGED IN
    ===================================================== */

    if (!token || !user) {

        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#fafbf9] px-5">

                <div className="text-center max-w-md">

                    <div className="w-16 h-16 mx-auto rounded-full bg-[#edf3ef] flex items-center justify-center mb-5 text-2xl">
                        👤
                    </div>


                    <h1 className="text-2xl font-semibold text-[#17211d]">
                        Login to view your profile
                    </h1>


                    <p className="text-sm text-gray-500 mt-2 leading-6">
                        Manage your bookings, list your RV and access your
                        account from one place.
                    </p>


                    <button
                        onClick={() => setShowLogin(true)}
                        className="
                            mt-6
                            px-6
                            py-3
                            rounded-xl
                            bg-[#123c32]
                            text-white
                            text-sm
                            font-semibold
                            hover:bg-[#0d3028]
                            transition
                        "
                    >
                        Login / Register
                    </button>

                </div>

            </div>
        );

    }


    /* =====================================================
       PROFILE SHELL
    ===================================================== */

    return (
        <div className="min-h-[calc(100vh-78px)] bg-[#fafbf9]">

            <div className="flex items-start">


                {/* =================================================
                    LEFT SIDEBAR

                    Sidebar stays mounted while only the right
                    content changes.
                ================================================= */}

                <div className="
                    sticky
                    top-[78px]
                    h-[calc(100vh-78px)]
                    shrink-0
                ">

                    <Sidebar />

                </div>


                {/* =================================================
                    RIGHT CONTENT
                ================================================= */}

                <main className="flex-1 min-w-0">

                    <Routes>

                        {/* =================================================
                            DEFAULT PROFILE
                        ================================================= */}

                        <Route
                            index
                            element={
                                <Navigate
                                    to="dashboard"
                                    replace
                                />
                            }
                        />


                        {/* =================================================
                            DASHBOARD

                            Uses the NEW owner/Dashboard.jsx
                        ================================================= */}

                        <Route
                            path="dashboard"
                            element={<Dashboard />}
                        />


                        {/* =================================================
                            MANAGE CARAVANS
                        ================================================= */}

                        <Route
                            path="manage-cars"
                            element={<ManageCars />}
                        />


                        {/* =================================================
                            MANAGE BOOKINGS
                        ================================================= */}

                        <Route
                            path="manage-bookings"
                            element={<ManageBookings />}
                        />


                        {/* =================================================
                            MY BOOKINGS
                        ================================================= */}

                        <Route
                            path="my-bookings"
                            element={<MyBookings />}
                        />


                        {/* =================================================
                            FALLBACK
                        ================================================= */}

                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="dashboard"
                                    replace
                                />
                            }
                        />

                    </Routes>

                </main>

            </div>

        </div>
    );
};

export default Profile;