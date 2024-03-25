const mongoose = require('mongoose');

const healthBlogSchema = new mongoose.Schema({
    newsThumbnail: {
        type: String,
        required: true
    },
    newsTitle: {
        type: String,
        required: true
    },
    newsDetails: {
        type: String,
        required: true
    }
});

export default mongoose.models.HealthBlog || mongoose.model('HealthBlog', healthBlogSchema);