const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: true,
        maxlength: 120
    },
    avatar: {
        type: String
    },
    role: {
        type: Number, 
        default: 0
    },
    status: {
        type: Boolean, 
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
