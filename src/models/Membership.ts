const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    planName: {
        type: String,
        required: true
    },
    planPrice: {
        type: Number,
        required: true
    },
    isEmergencyDoctor: {
        type: Boolean,
    },
    isFreeDiagnosis: {
        type: Boolean
    },
    diagnosisDiscount: {
        type: Number
    },
    isFreeDoctorAppointment: {
        type: Boolean
    },
    doctorAppointmentDiscount: {
        type: Number
    }
});

export default mongoose.models.Membership || mongoose.model('Membership', membershipSchema);