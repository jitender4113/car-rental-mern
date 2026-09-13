import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ManageCars = () => {
    const {
        myCars,
        fetchMyCars,
        loadingMyCars,
    } = useAppContext();

    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchMyCars();
    }, []);


    const toggleAvailability = async (carId) => {
        try {
            setUpdatingId(carId);

            const { data } = await axios.post(
                "/api/owner/toggle-car",
                { carId }
            );

            if (data.success) {
                toast.success(data.message);
                fetchMyCars();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to update RV availability"
            );
        } finally {
            setUpdatingId(null);
        }
    };


    const removeListing = async (carId) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this RV listing?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(carId);

            const { data } = await axios.post(
                "/api/owner/delete-car",
                { carId }
            );

            if (data.success) {
                toast.success(data.message);
                fetchMyCars();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to remove RV listing"
            );
        } finally {
            setDeletingId(null);
        }
    };


    if (loadingMyCars) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#fafbf9]">
                <div className="flex items-center gap-3 text-[#123c32]">
                    <span className="w-5 h-5 border-2 border-[#123c32] border-t-transparent rounded-full animate-spin" />

                    <span className="text-sm font-medium">
                        Loading your caravans...
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
                        Your Listings
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

                        <div>

                            <h1 className="text-2xl md:text-3xl font-semibold text-[#17211d]">
                                Manage Caravans
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                Manage your listed RVs, availability and listings.
                            </p>

                        </div>

                        <a
                            href="/owner/add-car"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#123c32] text-white text-sm font-semibold hover:bg-[#0d3028] transition"
                        >
                            + List Another RV
                        </a>

                    </div>

                </div>


                {/* Empty State */}

                {myCars.length === 0 && (
                    <div className="bg-white border border-dashed border-[#cbd7d0] rounded-2xl p-10 text-center">

                        <div className="text-4xl mb-4">
                            🚐
                        </div>

                        <h2 className="text-xl font-semibold text-[#17211d]">
                            No RVs listed yet
                        </h2>

                        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                            You haven't listed a caravan or RV yet. Add your
                            first RV and make it available for travelers.
                        </p>

                        <a
                            href="/owner/add-car"
                            className="inline-flex items-center mt-6 px-5 py-3 rounded-xl bg-[#123c32] text-white text-sm font-semibold hover:bg-[#0d3028] transition"
                        >
                            + List Your RV
                        </a>

                    </div>
                )}


                {/* RV Grid */}

                {myCars.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {myCars.map((car) => (

                            <div
                                key={car._id}
                                className="bg-white border border-[#e2e8e4] rounded-2xl overflow-hidden shadow-sm"
                            >

                                {/* Image */}

                                <div className="h-52 bg-[#f1f5f2] relative">

                                    <img
                                        src={car.image}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover"
                                    />

                                    <div
                                        className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-semibold ${
                                            car.isAvaliable
                                                ? "bg-white text-[#16805c]"
                                                : "bg-white text-gray-500"
                                        }`}
                                    >
                                        {car.isAvaliable
                                            ? "Available"
                                            : "Unavailable"}
                                    </div>

                                </div>


                                {/* Content */}

                                <div className="p-5">

                                    <div className="flex items-start justify-between gap-4">

                                        <div>

                                            <h2 className="text-lg font-semibold text-[#17211d]">
                                                {car.brand} {car.model}
                                            </h2>

                                            <p className="text-xs text-gray-500 mt-1">
                                                {car.year} • {car.vehicleType}
                                            </p>

                                        </div>

                                        <div className="text-right shrink-0">

                                            <p className="text-lg font-semibold text-[#123c32]">
                                                ₹{car.pricePerDay}
                                            </p>

                                            <p className="text-[10px] text-gray-400">
                                                per day
                                            </p>

                                        </div>

                                    </div>


                                    {/* Details */}

                                    <div className="grid grid-cols-2 gap-3 mt-5">

                                        <div className="bg-[#f7f9f7] rounded-xl px-3 py-3">

                                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                                                Category
                                            </p>

                                            <p className="text-xs font-medium text-[#17211d] mt-1">
                                                {car.category}
                                            </p>

                                        </div>


                                        <div className="bg-[#f7f9f7] rounded-xl px-3 py-3">

                                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                                                Sleeps
                                            </p>

                                            <p className="text-xs font-medium text-[#17211d] mt-1">
                                                {car.sleeps} guests
                                            </p>

                                        </div>


                                        <div className="bg-[#f7f9f7] rounded-xl px-3 py-3 col-span-2">

                                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                                                Location
                                            </p>

                                            <p className="text-xs font-medium text-[#17211d] mt-1">
                                                📍 {car.location}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Amenities */}

                                    {Array.isArray(car.amenities) &&
                                        car.amenities.length > 0 && (
                                            <div className="mt-5">

                                                <p className="text-xs font-semibold text-[#17211d] mb-2">
                                                    Amenities
                                                </p>

                                                <div className="flex flex-wrap gap-2">

                                                    {car.amenities
                                                        .slice(0, 8)
                                                        .map((amenity) => (
                                                            <span
                                                                key={amenity}
                                                                className="px-2.5 py-1.5 rounded-lg bg-[#edf3ef] text-[10px] text-[#123c32]"
                                                            >
                                                                {amenity}
                                                            </span>
                                                        ))}

                                                    {car.amenities.length > 8 && (
                                                        <span className="px-2.5 py-1.5 rounded-lg bg-gray-100 text-[10px] text-gray-500">
                                                            +{car.amenities.length - 8} more
                                                        </span>
                                                    )}

                                                </div>

                                            </div>
                                        )}


                                    {/* Actions */}

                                    <div className="flex gap-3 mt-6 pt-5 border-t border-[#e2e8e4]">

                                        <button
                                            onClick={() =>
                                                toggleAvailability(car._id)
                                            }
                                            disabled={
                                                updatingId === car._id ||
                                                deletingId === car._id
                                            }
                                            className="flex-1 px-4 py-3 rounded-xl border border-[#123c32] text-[#123c32] text-xs font-semibold hover:bg-[#edf3ef] transition disabled:opacity-50"
                                        >
                                            {updatingId === car._id
                                                ? "Updating..."
                                                : car.isAvaliable
                                                ? "Make Unavailable"
                                                : "Make Available"}
                                        </button>


                                        <button
                                            onClick={() =>
                                                removeListing(car._id)
                                            }
                                            disabled={
                                                updatingId === car._id ||
                                                deletingId === car._id
                                            }
                                            className="px-4 py-3 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50"
                                        >
                                            {deletingId === car._id
                                                ? "Removing..."
                                                : "Remove Listing"}
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
};

export default ManageCars;