
const Bookings = require('../models/Booking');

// CREATE BOOKING
const createBooking = async (req, res) => {
    try {
        const {
            albumPackage,
            albumPages,
            albumSize,
            numberOfCopies,
            albumCover,
            paperQuality,
            designStyle,
            customerName,
            mobile,
            email,
            eventType,
            eventDate,
            city,
            fullAddress,
            specialInstructions
        } = req.body;

        const booking = await Bookings.create({
            albumPackage,
            albumPages,
            albumSize,
            numberOfCopies,
            albumCover,
            paperQuality,
            designStyle,
            customerName,
            mobile,
            email,
            eventType,
            eventDate,
            city,
            fullAddress,
            specialInstructions
        });

        res.status(201).json({
            message: 'Album Booking Successfully Created',
            booking,
            success: true
        });

    } catch (error) {
        console.log('Create Booking Error:', error);

        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            message: 'All Album Bookings Fetched Successfully',
            bookings,
            success: true
        });

    } catch (error) {
        console.log('Get Booking Error:', error);

        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// GET SINGLE BOOKING
const getSingleBooking = async (req, res) => {
    try {
        const booking = await Bookings.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: 'Booking Not Found',
                success: false
            });
        }

        res.status(200).json({
            message: 'Booking Details Fetched Successfully',
            booking,
            success: true
        });

    } catch (error) {
        console.log('Get Single Booking Error:', error);

        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// UPDATE BOOKING
const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Bookings.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                message: 'Booking Not Found',
                success: false
            });
        }

        res.status(200).json({
            message: 'Album Booking Updated Successfully',
            booking: updatedBooking,
            success: true
        });

    } catch (error) {
        console.log('Update Booking Error:', error);

        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// DELETE BOOKING
const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Bookings.findByIdAndDelete(
            req.params.id
        );

        if (!deletedBooking) {
            return res.status(404).json({
                message: 'Booking Not Found',
                success: false
            });
        }

        res.status(200).json({
            message: 'Album Booking Deleted Successfully',
            success: true
        });

    } catch (error) {
        console.log('Delete Booking Error:', error);

        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


module.exports = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking
};
