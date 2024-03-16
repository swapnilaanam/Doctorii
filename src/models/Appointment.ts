import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorEmail: {
        type: String,
        required: true
    },
    scheduleDate: {
        type: String,
        required: true
    },
    scheduleTime: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    isAppointmentCompleted: {
        type: String,
        required: true,
        default: 'Scheduled'
    }
});

export default mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);