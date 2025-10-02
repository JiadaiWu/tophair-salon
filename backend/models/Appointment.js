const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        enum: ['haircut', 'color', 'perm', 'cut-color', 'cut-perm', 'others']
    },
    location: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4']
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'confirmed', 'completed', 'cancelled']
    }
})

module.exports = mongoose.model('Appointment', appointmentSchema)