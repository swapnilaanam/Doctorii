import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    doctorRole: {
        type: String,
    },
    timeSlots: {
        type: Array,
    }
});

export default mongoose.models.User || mongoose.model("User", userSchema);