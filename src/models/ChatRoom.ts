const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true,
        unique: true
    },
    allMessages: {
        type: Array,
        required: true
    }
});

export default mongoose.models.ChatRoom || mongoose.model('ChatRoom', chatRoomSchema);