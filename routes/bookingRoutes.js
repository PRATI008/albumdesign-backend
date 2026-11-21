
const express = require('express');

const {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

// CREATE BOOKING
router.post('/booking', createBooking);

// GET ALL BOOKINGS
router.get('/bookings', getAllBookings);

// GET SINGLE BOOKING
router.get('/booking/:id', getSingleBooking);

// UPDATE BOOKING
router.put('/booking/:id', updateBooking);

// DELETE BOOKING
router.delete('/booking/:id', deleteBooking);

module.exports = router;
