import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ManageBookings = () => {
    const { token } = useAppContext();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);


    const fetchBookings = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get("/api/bookings/owner");

            if (data.success) {
                setBookings(data.bookings || []);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load booking requests"
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (token) {
            fetchBookings();
        }
    }, [token]);


    const changeStatus = async (bookingId, status) => {
        try {
            setUpdatingId(bookingId);

            const { data } = await axios.post(
                "/api/bookings/change-status",
                {
                    bookingId,
                    status,
                }
            );

            if (data.success) {
                toast.success(data.message);
                fetchBookings();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to update booking"
            );
        } finally {
            setUpdatingId(null);
        }
    };


    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };


    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#fafbf9]">
                <div className="flex items-center gap-3 text-[#123c32]">

                    <span className="w-5 h-5 border-2 border-[#123c32] border-t-transparent rounded-full animate-spin" />

                    <span className="text-sm font-medium">
                        Loading booking requests...
                    </span>

                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#fafbf9] p-5 md:p-8">

            <div className="max-w-6xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#c6a15b] mb-2">
                        Rental Requests
                    </p>

                    <h1 className="text-2xl md:text-3xl font-semibold text-[#17211d]">
                        Manage Bookings
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Review and manage booking requests for your caravans.
                    </p>

                </div>


                {/* Empty State */}

                {bookings.length === 0 && (
                    <div className="bg-white border border-dashed border-[#cbd7d0] rounded-2xl p-10 text-center">

                        <div className="w-14 h-14 mx-auto rounded-full bg-[#edf3ef] flex items-center justify-center text-2xl">
                            📅
                        </div>

                        <h2 className="text-xl font-semibold text-[#17211d] mt-4">
                            No booking requests yet
                        </h2>

                        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-6">
                            When travelers book one of your RVs, their requests
                            will appear here.
                        </p>

                    </div>
                )}


                {/* Booking List */}

                {bookings.length > 0 && (
                    <div className="space-y-4">

                        {bookings.map((booking) => {

                            const car = booking.car;
                            const customer = booking.user;

                            return (
                                <div
                                    key={booking._id}
                                    className="bg-white border border-[#e2e8e4] rounded-2xl p-5 md:p-6 shadow-sm"
                                >

                                    <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-5 items-start">

                                        {/* RV Image */}

                                        <div className="h-36 lg:h-32 rounded-xl overflow-hidden bg-[#f1f5f2]">

                                            {car?.image ? (
                                                <img
                                                    src={car.image}
                                                    alt={`${car.brand || ""} ${car.model || ""}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-3xl">
                                                    🚐
                                                </div>
                                            )}

                                        </div>


                                        {/* Booking Details */}

                                        <div>

                                            <div className="flex flex-wrap items-center gap-2">

                                                <h2 className="text-lg font-semibold text-[#17211d]">
                                                    {car
                                                        ? `${car.brand} ${car.model}`
                                                        : "Caravan"}
                                                </h2>

                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                                                        booking.status === "confirmed"
                                                            ? "bg-green-50 text-green-600"
                                                            : booking.status === "cancelled"
                                                            ? "bg-red-50 text-red-500"
                                                            : "bg-amber-50 text-amber-600"
                                                    }`}
                                                >
                                                    {booking.status
                                                        ? booking.status
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                          booking.status.slice(1)
                                                        : "Pending"}
                                                </span>

                                            </div>


                                            {/* Customer */}

                                            <div className="mt-4">

                                                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                                                    Traveler
                                                </p>

                                                <p className="text-sm font-medium text-[#17211d] mt-1">
                                                    {customer?.name || "Traveler"}
                                                </p>

                                                {customer?.email && (
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {customer.email}
                                                    </p>
                                                )}

                                            </div>


                                            {/* Dates */}

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">

                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                                                        Pickup
                                                    </p>

                                                    <p className="text-xs font-medium text-[#17211d] mt-1">
                                                        {formatDate(
                                                            booking.pickupDate
                                                        )}
                                                    </p>
                                                </div>


                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                                                        Return
                                                    </p>

                                                    <p className="text-xs font-medium text-[#17211d] mt-1">
                                                        {formatDate(
                                                            booking.returnDate
                                                        )}
                                                    </p>
                                                </div>


                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                                                        Amount
                                                    </p>

                                                    <p className="text-sm font-semibold text-[#123c32] mt-1">
                                                        ₹{booking.price}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>


                                        {/* Actions */}

                                        <div className="flex lg:flex-col gap-2 lg:min-w-[130px]">

                                            {booking.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            changeStatus(
                                                                booking._id,
                                                                "confirmed"
                                                            )
                                                        }
                                                        disabled={
                                                            updatingId ===
                                                            booking._id
                                                        }
                                                        className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-[#123c32] text-white text-xs font-semibold hover:bg-[#0d3028] transition disabled:opacity-50"
                                                    >
                                                        {updatingId ===
                                                        booking._id
                                                            ? "Updating..."
                                                            : "Accept"}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            changeStatus(
                                                                booking._id,
                                                                "cancelled"
                                                            )
                                                        }
                                                        disabled={
                                                            updatingId ===
                                                            booking._id
                                                        }
                                                        className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50"
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}

                                            {booking.status === "confirmed" && (
                                                <button
                                                    onClick={() =>
                                                        changeStatus(
                                                            booking._id,
                                                            "cancelled"
                                                        )
                                                    }
                                                    disabled={
                                                        updatingId ===
                                                        booking._id
                                                    }
                                                    className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50"
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}

                                            {booking.status === "cancelled" && (
                                                <span className="text-xs text-gray-400 text-center py-2">
                                                    Booking cancelled
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

        </div>
    );
};

export default ManageBookings;