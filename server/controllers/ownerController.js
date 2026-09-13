import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

// =====================================================
// API TO CHANGE ROLE OF USER
// =====================================================

export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;

        await User.findByIdAndUpdate(_id, {
            role: "owner"
        });

        res.json({
            success: true,
            message: "You can now list your RV"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// API TO LIST RV
// =====================================================

export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;

        const car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({
                success: false,
                message: "RV image is required"
            });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/cars"
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {
                    width: "1280"
                },
                {
                    quality: "auto"
                },
                {
                    format: "webp"
                }
            ]
        });

        await Car.create({
            ...car,
            owner: _id,
            image: optimizedImageUrl
        });

        res.json({
            success: true,
            message: "RV listed successfully"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// API TO GET USER'S RVS
// =====================================================

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;

        const cars = await Car
            .find({
                owner: _id
            })
            .sort({
                createdAt: -1
            });

        res.json({
            success: true,
            cars
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// API TO TOGGLE RV AVAILABILITY
// =====================================================

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;

        if (!carId) {
            return res.json({
                success: false,
                message: "RV ID is required"
            });
        }

        const car = await Car.findById(carId);

        if (!car) {
            return res.json({
                success: false,
                message: "RV not found"
            });
        }

        if (
            !car.owner ||
            car.owner.toString() !== _id.toString()
        ) {
            return res.json({
                success: false,
                message: "Unauthorized"
            });
        }

        car.isAvaliable = !car.isAvaliable;

        await car.save();

        res.json({
            success: true,
            message: car.isAvaliable
                ? "RV is now available"
                : "RV is now unavailable"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// API TO REMOVE RV LISTING
// =====================================================

export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;

        if (!carId) {
            return res.json({
                success: false,
                message: "RV ID is required"
            });
        }

        const car = await Car.findById(carId);

        if (!car) {
            return res.json({
                success: false,
                message: "RV not found"
            });
        }

        if (
            !car.owner ||
            car.owner.toString() !== _id.toString()
        ) {
            return res.json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Soft remove so old booking history remains safe.
        car.owner = null;
        car.isAvaliable = false;

        await car.save();

        res.json({
            success: true,
            message: "RV listing removed"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// API TO GET OWNER DASHBOARD DATA
// =====================================================

export const getDashboardData = async (req, res) => {
    try {
        const { _id } = req.user;

        // =================================================
        // USER'S RVs
        // =================================================

        const cars = await Car.find({
            owner: _id
        });

        // =================================================
        // ALL BOOKINGS RECEIVED BY THIS OWNER
        // =================================================

        const bookings = await Booking
            .find({
                owner: _id
            })
            .populate("car")
            .populate("user", "name email image")
            .sort({
                createdAt: -1
            });


        // =================================================
        // BOOKING COUNTS
        // =================================================

        const totalBookings = bookings.length;

        const pendingBookings = bookings.filter(
            booking => booking.status === "pending"
        );

        const confirmedBookings = bookings.filter(
            booking => booking.status === "confirmed"
        );

        const cancelledBookings = bookings.filter(
            booking => booking.status === "cancelled"
        );


        // =================================================
        // MONEY CALCULATIONS
        // =================================================

        // Actual earnings = confirmed bookings only
        const totalEarnings = confirmedBookings.reduce(
            (total, booking) =>
                total + Number(booking.price || 0),
            0
        );


        // Money expected from pending bookings
        const pendingRevenue = pendingBookings.reduce(
            (total, booking) =>
                total + Number(booking.price || 0),
            0
        );


        // Revenue lost through cancelled bookings
        const cancelledRevenue = cancelledBookings.reduce(
            (total, booking) =>
                total + Number(booking.price || 0),
            0
        );


        // All booking value irrespective of status
        const totalBookingValue = bookings.reduce(
            (total, booking) =>
                total + Number(booking.price || 0),
            0
        );


        // Average value of confirmed bookings
        const averageBookingValue =
            confirmedBookings.length > 0
                ? Math.round(
                    totalEarnings /
                    confirmedBookings.length
                )
                : 0;


        // =================================================
        // THIS MONTH REVENUE
        // =================================================

        const now = new Date();

        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonthBookings = confirmedBookings.filter(
            booking => {
                const bookingDate = new Date(
                    booking.createdAt
                );

                return (
                    bookingDate.getMonth() === currentMonth &&
                    bookingDate.getFullYear() === currentYear
                );
            }
        );

        const monthlyRevenue = thisMonthBookings.reduce(
            (total, booking) =>
                total + Number(booking.price || 0),
            0
        );


        // =================================================
        // LAST 6 MONTH REVENUE
        // =================================================

        const monthlyRevenueData = [];

        for (let i = 5; i >= 0; i--) {

            const date = new Date(
                currentYear,
                currentMonth - i,
                1
            );

            const year = date.getFullYear();
            const month = date.getMonth();

            const revenue = confirmedBookings
                .filter(booking => {

                    const bookingDate = new Date(
                        booking.createdAt
                    );

                    return (
                        bookingDate.getFullYear() === year &&
                        bookingDate.getMonth() === month
                    );

                })
                .reduce(
                    (total, booking) =>
                        total + Number(booking.price || 0),
                    0
                );


            const monthName = date.toLocaleString(
                "en-US",
                {
                    month: "short"
                }
            );


            monthlyRevenueData.push({
                month: monthName,
                revenue
            });
        }


        // =================================================
        // RECENT BOOKINGS
        // =================================================

        const recentBookings = bookings
            .slice(0, 6);


        // =================================================
        // DASHBOARD RESPONSE
        // =================================================

        const dashboardData = {

            // RV stats
            totalCars: cars.length,

            availableCars: cars.filter(
                car => car.isAvaliable
            ).length,

            unavailableCars: cars.filter(
                car => !car.isAvaliable
            ).length,


            // Booking stats
            totalBookings,

            pendingBookings:
                pendingBookings.length,

            confirmedBookings:
                confirmedBookings.length,

            completedBookings:
                confirmedBookings.length,

            cancelledBookings:
                cancelledBookings.length,


            // Money
            totalEarnings,

            monthlyRevenue,

            pendingRevenue,

            cancelledRevenue,

            totalBookingValue,

            averageBookingValue,


            // Chart
            monthlyRevenueData,


            // Recent activity
            recentBookings
        };


        res.json({
            success: true,
            dashboardData
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// API TO UPDATE USER IMAGE
// =====================================================

export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;

        const imageFile = req.file;

        if (!imageFile) {
            return res.json({
                success: false,
                message: "Image is required"
            });
        }

        const fileBuffer = fs.readFileSync(
            imageFile.path
        );

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users"
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {
                    width: "400"
                },
                {
                    quality: "auto"
                },
                {
                    format: "webp"
                }
            ]
        });

        await User.findByIdAndUpdate(
            _id,
            {
                image: optimizedImageUrl
            }
        );

        res.json({
            success: true,
            message: "Profile image updated"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};