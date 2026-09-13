import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Dashboard = () => {

    const {
        axios,
        token,
        currency
    } = useAppContext();


    const [data, setData] = useState({
        totalCars: 0,
        availableCars: 0,
        unavailableCars: 0,

        totalBookings: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,

        totalEarnings: 0,
        monthlyRevenue: 0,
        pendingRevenue: 0,
        cancelledRevenue: 0,
        totalBookingValue: 0,
        averageBookingValue: 0,

        monthlyRevenueData: [],
        recentBookings: []
    });


    const [loading, setLoading] = useState(true);


    // =====================================================
    // FETCH DASHBOARD
    // =====================================================

    const fetchDashboardData = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                "/api/owner/dashboard"
            );

            if (response.data.success) {

                setData(
                    response.data.dashboardData
                );

            } else {

                toast.error(
                    response.data.message
                );

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        if (token) {
            fetchDashboardData();
        }

    }, [token]);


    // =====================================================
    // FORMAT MONEY
    // =====================================================

    const money = (value) => {

        return `${currency}${Number(
            value || 0
        ).toLocaleString("en-IN")}`;

    };


    // =====================================================
    // MAIN STATS
    // =====================================================

    const mainStats = [

        {
            title: "Total Earnings",
            value: money(data.totalEarnings),
            subtitle: "Confirmed bookings",
            icon: "₹",
            highlight: true
        },

        {
            title: "Total Bookings",
            value: data.totalBookings,
            subtitle: `${data.confirmedBookings} confirmed`,
            icon: "▦"
        },

        {
            title: "Pending Bookings",
            value: data.pendingBookings,
            subtitle: money(data.pendingRevenue) + " expected",
            icon: "◷"
        },

        {
            title: "Total RVs",
            value: data.totalCars,
            subtitle: `${data.availableCars} available`,
            icon: "▣"
        }

    ];


    // =====================================================
    // REVENUE MAX FOR CHART
    // =====================================================

    const maxRevenue = Math.max(
        ...data.monthlyRevenueData.map(
            item => item.revenue
        ),
        1
    );


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafbf9]">

                <div className="flex items-center gap-3 text-[#123c32]">

                    <span className="w-5 h-5 border-2 border-[#123c32] border-t-transparent rounded-full animate-spin" />

                    <span className="text-sm font-medium">
                        Loading your dashboard...
                    </span>

                </div>

            </div>
        );
    }


    return (

        <div className="px-4 md:px-8 lg:px-10 py-8 md:py-10 flex-1 bg-[#fafbf9] min-h-screen">

            <div className="max-w-7xl mx-auto">


                {/* =================================================
                    HEADER
                ================================================= */}

                <Title
                    title="Owner Dashboard"
                    subTitle="Track your RV business, bookings, revenue and rental activity from one place."
                />


                {/* =================================================
                    MAIN STATS
                ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mt-8">

                    {mainStats.map(
                        (stat, index) => (

                            <motion.div
                                key={stat.title}
                                initial={{
                                    opacity: 0,
                                    y: 15
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay:
                                        index * 0.07,
                                    duration: 0.4
                                }}
                                className={`
                                    relative
                                    overflow-hidden
                                    rounded-[20px]
                                    p-5
                                    border
                                    shadow-[0_6px_25px_rgba(30,40,35,0.04)]
                                    transition
                                    hover:-translate-y-0.5
                                    hover:shadow-[0_12px_30px_rgba(30,40,35,0.08)]
                                    ${
                                        stat.highlight
                                            ? "bg-[#123c32] border-[#123c32] text-white"
                                            : "bg-white border-[#e3e8e5]"
                                    }
                                `}
                            >

                                {stat.highlight && (
                                    <>
                                        <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full border border-white/10" />

                                        <div className="absolute -right-5 -top-5 w-20 h-20 rounded-full border border-[#c6a15b]/20" />
                                    </>
                                )}


                                <div className="relative z-10 flex items-start justify-between gap-3">

                                    <div>

                                        <p
                                            className={`text-[10px] uppercase tracking-[0.14em] font-semibold ${
                                                stat.highlight
                                                    ? "text-emerald-100/70"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {stat.title}
                                        </p>


                                        <p
                                            className={`text-2xl md:text-3xl font-semibold mt-2 ${
                                                stat.highlight
                                                    ? "text-white"
                                                    : "text-[#17211d]"
                                            }`}
                                        >
                                            {stat.value}
                                        </p>


                                        <p
                                            className={`text-[11px] mt-2 ${
                                                stat.highlight
                                                    ? "text-white/50"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {stat.subtitle}
                                        </p>

                                    </div>


                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-semibold ${
                                            stat.highlight
                                                ? "bg-white/10 text-[#c6a15b]"
                                                : "bg-[#eef5f1] text-[#123c32]"
                                        }`}
                                    >
                                        {stat.icon}
                                    </div>

                                </div>

                            </motion.div>

                        )
                    )}

                </div>


                {/* =================================================
                    MONEY OVERVIEW
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">


                    {/* PENDING */}

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
                            delay: 0.3
                        }}
                        className="bg-white border border-[#e3e8e5] rounded-[20px] p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[10px] uppercase tracking-[0.14em] text-amber-600 font-semibold">
                                    Pending Revenue
                                </p>

                                <p className="text-2xl font-semibold text-[#17211d] mt-2">
                                    {money(data.pendingRevenue)}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    From pending bookings
                                </p>

                            </div>

                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                ◷
                            </div>

                        </div>

                    </motion.div>


                    {/* CANCELLED */}

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
                            delay: 0.36
                        }}
                        className="bg-white border border-[#e3e8e5] rounded-[20px] p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[10px] uppercase tracking-[0.14em] text-red-500 font-semibold">
                                    Cancelled Value
                                </p>

                                <p className="text-2xl font-semibold text-[#17211d] mt-2">
                                    {money(data.cancelledRevenue)}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    From cancelled bookings
                                </p>

                            </div>

                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                                ×
                            </div>

                        </div>

                    </motion.div>


                    {/* AVERAGE */}

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
                            delay: 0.42
                        }}
                        className="bg-white border border-[#e3e8e5] rounded-[20px] p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[10px] uppercase tracking-[0.14em] text-[#c6a15b] font-semibold">
                                    Average Booking
                                </p>

                                <p className="text-2xl font-semibold text-[#17211d] mt-2">
                                    {money(data.averageBookingValue)}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Per confirmed booking
                                </p>

                            </div>

                            <div className="w-10 h-10 rounded-xl bg-[#f8f2e6] flex items-center justify-center text-[#c6a15b]">
                                ₹
                            </div>

                        </div>

                    </motion.div>

                </div>


                {/* =================================================
                    CHART + BOOKING STATUS
                ================================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mt-5">


                    {/* =================================================
                        REVENUE CHART
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.45
                        }}
                        className="bg-white border border-[#e3e8e5] rounded-[22px] p-5 md:p-6"
                    >

                        <div className="flex items-start justify-between gap-4">

                            <div>

                                <p className="text-[10px] uppercase tracking-[0.15em] text-[#c6a15b] font-semibold">
                                    Revenue
                                </p>

                                <h2 className="text-lg font-semibold text-[#17211d] mt-1">
                                    Earnings Overview
                                </h2>

                                <p className="text-xs text-gray-400 mt-1">
                                    Confirmed booking revenue over the last 6 months
                                </p>

                            </div>


                            <div className="text-right">

                                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                    This Month
                                </p>

                                <p className="text-lg font-semibold text-[#123c32] mt-1">
                                    {money(data.monthlyRevenue)}
                                </p>

                            </div>

                        </div>


                        {/* CHART */}

                        <div className="mt-8">

                            <div className="h-52 flex items-end gap-3 md:gap-5">

                                {data.monthlyRevenueData.map(
                                    (item, index) => {

                                        const height =
                                            item.revenue > 0
                                                ? Math.max(
                                                    (item.revenue /
                                                        maxRevenue) *
                                                        100,
                                                    8
                                                )
                                                : 5;

                                        return (

                                            <div
                                                key={`${item.month}-${index}`}
                                                className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                                            >

                                                <div className="w-full flex justify-center items-end h-full">

                                                    <motion.div
                                                        initial={{
                                                            height: 0
                                                        }}
                                                        animate={{
                                                            height: `${height}%`
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.5 +
                                                                index *
                                                                    0.08,
                                                            duration: 0.5
                                                        }}
                                                        className="w-full max-w-[48px] bg-[#123c32] rounded-t-xl relative group"
                                                    >

                                                        {item.revenue > 0 && (

                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg bg-[#17211d] text-white text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                                                {money(
                                                                    item.revenue
                                                                )}
                                                            </div>

                                                        )}

                                                    </motion.div>

                                                </div>


                                                <span className="text-[10px] text-gray-400 font-medium">
                                                    {item.month}
                                                </span>

                                            </div>

                                        );
                                    }
                                )}

                            </div>

                        </div>

                    </motion.div>


                    {/* =================================================
                        BOOKING STATUS
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.5
                        }}
                        className="bg-[#123c32] rounded-[22px] p-6 text-white relative overflow-hidden"
                    >

                        <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full border border-white/10" />

                        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full border border-[#c6a15b]/20" />


                        <div className="relative z-10">

                            <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-200/70 font-semibold">
                                Bookings
                            </p>

                            <h2 className="text-lg font-semibold mt-1">
                                Booking Status
                            </h2>

                            <p className="text-xs text-white/45 mt-1">
                                Current reservation breakdown
                            </p>


                            <div className="mt-7 space-y-4">


                                {/* CONFIRMED */}

                                <div>

                                    <div className="flex items-center justify-between mb-1.5">

                                        <span className="text-xs text-white/70">
                                            Confirmed
                                        </span>

                                        <span className="text-xs font-semibold">
                                            {data.confirmedBookings}
                                        </span>

                                    </div>

                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">

                                        <div
                                            className="h-full bg-[#c6a15b] rounded-full"
                                            style={{
                                                width: `${
                                                    data.totalBookings
                                                        ? (
                                                            data.confirmedBookings /
                                                            data.totalBookings
                                                        ) * 100
                                                        : 0
                                                }%`
                                            }}
                                        />

                                    </div>

                                </div>


                                {/* PENDING */}

                                <div>

                                    <div className="flex items-center justify-between mb-1.5">

                                        <span className="text-xs text-white/70">
                                            Pending
                                        </span>

                                        <span className="text-xs font-semibold">
                                            {data.pendingBookings}
                                        </span>

                                    </div>

                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">

                                        <div
                                            className="h-full bg-amber-300 rounded-full"
                                            style={{
                                                width: `${
                                                    data.totalBookings
                                                        ? (
                                                            data.pendingBookings /
                                                            data.totalBookings
                                                        ) * 100
                                                        : 0
                                                }%`
                                            }}
                                        />

                                    </div>

                                </div>


                                {/* CANCELLED */}

                                <div>

                                    <div className="flex items-center justify-between mb-1.5">

                                        <span className="text-xs text-white/70">
                                            Cancelled
                                        </span>

                                        <span className="text-xs font-semibold">
                                            {data.cancelledBookings}
                                        </span>

                                    </div>

                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">

                                        <div
                                            className="h-full bg-red-300 rounded-full"
                                            style={{
                                                width: `${
                                                    data.totalBookings
                                                        ? (
                                                            data.cancelledBookings /
                                                            data.totalBookings
                                                        ) * 100
                                                        : 0
                                                }%`
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="mt-8 pt-5 border-t border-white/10">

                                <div className="flex items-center justify-between">

                                    <span className="text-xs text-white/50">
                                        Total booking value
                                    </span>

                                    <span className="text-sm font-semibold">
                                        {money(
                                            data.totalBookingValue
                                        )}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>


                {/* =================================================
                    RECENT BOOKINGS
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.55
                    }}
                    className="mt-5 bg-white border border-[#e3e8e5] rounded-[22px] overflow-hidden"
                >

                    <div className="px-5 md:px-6 py-5 border-b border-[#edf0ee] flex items-center justify-between">

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.15em] text-[#c6a15b] font-semibold">
                                Activity
                            </p>

                            <h2 className="text-lg font-semibold text-[#17211d] mt-1">
                                Recent Bookings
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                                Latest reservations for your RVs
                            </p>

                        </div>

                        <div className="hidden sm:block text-xs text-gray-400">
                            {data.totalBookings} total
                        </div>

                    </div>


                    {data.recentBookings.length === 0 ? (

                        <div className="py-16 flex flex-col items-center justify-center text-center">

                            <div className="w-14 h-14 rounded-2xl bg-[#eef5f1] flex items-center justify-center text-2xl">
                                🚐
                            </div>

                            <p className="text-sm font-semibold text-gray-600 mt-4">
                                No bookings yet
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                New reservations will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="divide-y divide-[#edf0ee]">

                            {data.recentBookings.map(
                                (booking, index) => (

                                    <motion.div
                                        key={
                                            booking._id ||
                                            index
                                        }
                                        initial={{
                                            opacity: 0,
                                            x: -10
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}
                                        transition={{
                                            delay:
                                                0.1 +
                                                index * 0.05
                                        }}
                                        className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >

                                        {/* RV + CUSTOMER */}

                                        <div className="flex items-center gap-3 min-w-0">

                                            <div className="w-11 h-11 rounded-xl bg-[#eef5f1] flex items-center justify-center shrink-0 overflow-hidden">

                                                {booking.car?.image ? (

                                                    <img
                                                        src={
                                                            booking
                                                                .car
                                                                .image
                                                        }
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />

                                                ) : (

                                                    <span className="text-lg">
                                                        🚐
                                                    </span>

                                                )}

                                            </div>


                                            <div className="min-w-0">

                                                <p className="text-sm font-semibold text-[#17211d] truncate">

                                                    {booking.car?.brand ||
                                                        "RV"}{" "}

                                                    {booking.car?.model ||
                                                        ""}

                                                </p>


                                                <p className="text-[11px] text-gray-400 mt-1 truncate">

                                                    {booking.user?.name ||
                                                        "Guest"}

                                                    {" · "}

                                                    {booking.createdAt
                                                        ? new Date(
                                                            booking.createdAt
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )
                                                        : "-"}

                                                </p>

                                            </div>

                                        </div>


                                        {/* BOOKING DATES */}

                                        <div className="hidden lg:block text-xs text-gray-400">

                                            <p>
                                                {booking.pickupDate
                                                    ? new Date(
                                                        booking.pickupDate
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short"
                                                        }
                                                    )
                                                    : "-"}
                                                {" → "}
                                                {booking.returnDate
                                                    ? new Date(
                                                        booking.returnDate
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short"
                                                        }
                                                    )
                                                    : "-"}
                                            </p>

                                        </div>


                                        {/* PRICE + STATUS */}

                                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">

                                            <p className="text-sm font-semibold text-[#123c32]">
                                                {money(
                                                    booking.price
                                                )}
                                            </p>


                                            <span
                                                className={`
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    text-[10px]
                                                    font-semibold
                                                    capitalize
                                                    ${
                                                        booking.status ===
                                                        "confirmed"
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : booking.status ===
                                                              "pending"
                                                            ? "bg-amber-50 text-amber-700"
                                                            : "bg-red-50 text-red-600"
                                                    }
                                                `}
                                            >
                                                {booking.status}
                                            </span>

                                        </div>

                                    </motion.div>

                                )
                            )}

                        </div>

                    )}

                </motion.div>


                {/* =================================================
                    RV OVERVIEW
                ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pb-6">


                    <div className="bg-white border border-[#e3e8e5] rounded-[18px] p-5">

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                            Listed RVs
                        </p>

                        <p className="text-xl font-semibold text-[#17211d] mt-2">
                            {data.totalCars}
                        </p>

                    </div>


                    <div className="bg-white border border-[#e3e8e5] rounded-[18px] p-5">

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                            Available
                        </p>

                        <p className="text-xl font-semibold text-emerald-700 mt-2">
                            {data.availableCars}
                        </p>

                    </div>


                    <div className="bg-white border border-[#e3e8e5] rounded-[18px] p-5">

                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                            Unavailable
                        </p>

                        <p className="text-xl font-semibold text-gray-600 mt-2">
                            {data.unavailableCars}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;