const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { sendBookingNotification } = require('../utils/emailService');

// Create a new appointment
router.post('/book', async (req, res) => {
    try {
        console.log('Received booking request:', req.body);
        
        const appointment = new Appointment(req.body);
        await appointment.save();
        
        console.log('Appointment saved to database successfully!');
        
        // Send email notification
        try {
            await sendBookingNotification(appointment);
            console.log('Email notification sent successfully!');
        } catch (emailError) {
            console.error('Email sending failed:', emailError.message);
            // Email failure doesn't affect booking success
        }
        
        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully! We will contact you ASAP.',
            appointment: {
                id: appointment._id,
                customerName: appointment.customerName,
                service: appointment.service,
                location: appointment.location,
                appointmentDate: appointment.appointmentDate,
                appointmentTime: appointment.appointmentTime,
                status: appointment.status
            }
        });
        
    } catch (error) {
        console.error('Booking failed:', error.message);
        res.status(400).json({
            success: false,
            message: 'Booking failed. Please check if the information is complete and correct.',
            error: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log('Fetching all appointments');
        
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        
        console.log(`Found ${appointments.length} appointments.`);
        
        res.json({
            success: true,
            count: appointments.length,
            appointments
        });
        
    } catch (error) {
        console.error('Failed to fetch appointments:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to obtain the appointment list',
            error: error.message
        });
    }
});

// Customers search their own appointments
router.post('/search', async (req, res) => {
    try {
        const { customerName, phone, email } = req.body;
        console.log('Customer search request:', { customerName, phone, email });

        // Validation: customer name is required
        if (!customerName || customerName.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Please enter your name'
            });
        }

        // Validation: at least phone or email is required
        if (!phone && !email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide your phone number or email address'
            });
        }

        // Build search conditions
        const searchConditions = {
            customerName: customerName.trim()
        };

        // Add phone/email conditions
        if (phone && email) {
            searchConditions.$or = [
                { phone: phone.trim() },
                { email: email.trim() }
            ];
        } else if (phone) {
            searchConditions.phone = phone.trim();
        } else if (email) {
            searchConditions.email = email.trim();
        }

        console.log('Search conditions:', searchConditions);

        // Execute search
        const appointments = await Appointment.find(searchConditions).sort({ createdAt: -1 });

        console.log(`Found ${appointments.length} appointments for customer.`);

        res.json({
            success: true,
            count: appointments.length,
            appointments
        });

    } catch (error) {
        console.error('Customer search failed:', error.message);
        res.status(500).json({
            success: false,
            message: 'Search failed, please try again later',
            error: error.message
        });
    }
});

// Additional useful routes for admin/management

// Get appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        
        res.json({
            success: true,
            appointment
        });
        
    } catch (error) {
        console.error('Failed to fetch appointment:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointment',
            error: error.message
        });
    }
});

// Update appointment status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        // Validate status
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
            });
        }
        
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }
        
        console.log(`Appointment ${req.params.id} status updated to: ${status}`);
        
        res.json({
            success: true,
            message: 'Appointment status updated successfully',
            appointment
        });
        
    } catch (error) {
        console.error('Failed to update appointment:', error.message);
        res.status(400).json({
            success: false,
            message: 'Failed to update appointment status',
            error: error.message
        });
    }
});

// Get appointments by location
router.get('/location/:locationId', async (req, res) => {
    try {
        const { locationId } = req.params;
        
        // Validate location ID
        if (!['1', '2', '3', '4'].includes(locationId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid location ID. Must be 1, 2, 3, or 4'
            });
        }
        
        const appointments = await Appointment.find({ location: locationId })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            location: locationId,
            count: appointments.length,
            appointments
        });
        
    } catch (error) {
        console.error('Failed to fetch appointments by location:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments by location',
            error: error.message
        });
    }
});

module.exports = router;