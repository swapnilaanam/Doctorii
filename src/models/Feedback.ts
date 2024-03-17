const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feedbackRatings: {
        type: Number,
        required: true
    },
    feedbackText: {
        type: String,
        required: true
    }
});

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);