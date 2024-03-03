const mongoose = require('mongoose');

const membershipPaymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    planPrice: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    planName: {
        type: String,
        required: true
    }
});

export default mongoose.models.MembershipPayment || mongoose.model('MembershipPayment', membershipPaymentSchema);