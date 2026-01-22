const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // THE ADMIN FIX: Add a role field
    role: { 
        type: String, 
        default: 'customer', 
        enum: ['customer', 'admin'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);