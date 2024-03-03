const mongoose = require('mongoose');

const diagnosisPaymentSchema = new mongoose.Schema({
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
    ticketPrice: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    diagnosisName: {
        type: String,
        required: true
    }
});

export default mongoose.models.DiagnosisPayment || mongoose.model('DiagnosisPayment', diagnosisPaymentSchema);