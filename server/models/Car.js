import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
    {
        owner: {
            type: ObjectId,
            ref: "User",
            required: true,
        },

        // Basic RV Information
        brand: {
            type: String,
            required: true,
            trim: true,
        },

        model: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            required: true,
        },

        year: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        // RV specific fields
        vehicleType: {
            type: String,
            required: true,
            trim: true,
        },

        sleeps: {
            type: Number,
            required: true,
        },

        amenities: {
            type: [String],
            default: [],
        },

        // Pricing & Location
        pricePerDay: {
            type: Number,
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        isAvaliable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Car = mongoose.model("Car", carSchema);

export default Car;