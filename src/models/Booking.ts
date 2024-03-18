const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    diagnosisName: {
        type: String,
        required: true
    },
    diagnosedArea: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    bookedDate: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true,
        default: 'In Lab'
    }
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);