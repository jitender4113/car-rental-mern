import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/profile";

import Footer from "./components/Footer";

import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";

import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
    const { showLogin } = useAppContext();
    const location = useLocation();

    const isOwnerPath = location.pathname.startsWith("/owner");
    const isAddCarPage = location.pathname === "/owner/add-car";

    /*
     * Normal Navbar:
     * Public pages + Profile + List Your RV
     */
    const showNormalNavbar =
        !isOwnerPath || isAddCarPage;

    /*
     * Normal Footer:
     * Public pages + Profile + List Your RV
     */
    const showNormalFooter =
        !isOwnerPath || isAddCarPage;

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                }}
            />

            {/* Login Modal */}
            {showLogin && <Login />}

            {/* Main Website Navbar */}
            {showNormalNavbar && <Navbar />}

            <Routes>

                {/* ================= PUBLIC PAGES ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/cars"
                    element={<Cars />}
                />

                <Route
                    path="/car-details/:id"
                    element={<CarDetails />}
                />


                {/* ================= PROFILE ================= */}

                <Route
                    path="/profile/*"
                    element={<Profile />}
                />


                {/* ================= MY BOOKINGS ================= */}

                <Route
                    path="/my-bookings"
                    element={<MyBookings />}
                />


                {/* ================= LIST YOUR RV ================= */}

                {/*
                 * IMPORTANT:
                 * AddCar is OUTSIDE the protected Layout.
                 *
                 * This means:
                 * - Logged-out users can open the page
                 * - No sidebar
                 * - Normal Navbar
                 * - Normal Footer
                 * - Login is required only when submitting
                 */}

                <Route
                    path="/owner/add-car"
                    element={<AddCar />}
                />


                {/* ================= PROTECTED OWNER AREA ================= */}

                <Route
                    path="/owner"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="manage-cars"
                        element={<ManageCars />}
                    />

                    <Route
                        path="manage-bookings"
                        element={<ManageBookings />}
                    />
                </Route>

            </Routes>

            {/* Main Website Footer */}
            {showNormalFooter && <Footer />}
        </>
    );
};

export default App;