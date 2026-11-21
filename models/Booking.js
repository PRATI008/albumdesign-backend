
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  // STEP 1 - ALBUM DETAILS

  albumPackage: {
    type: String,
    required: true,
    trim: true
  },

  albumSize: {
    type: String,
    trim: true
  },

  albumPages: {
    type: Number,
    min: 1
  },

  numberOfCopies: {
    type: Number,
    min: 1,
    default: 1
  },

  albumCover: {
    type: String,
    trim: true
  },

  paperQuality: {
    type: String,
    trim: true
  },

  designStyle: {
    type: String,
    trim: true
  },

  // STEP 2 - CUSTOMER & EVENT DETAILS

  customerName: {
    type: String,
    required: true,
    trim: true
  },

  mobile: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },

  eventType: {
    type: String,
    required: true,
    trim: true
  },

  eventDate: {
    type: Date,
    required: true
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  fullAddress: {
    type: String,
    trim: true,
    default: ''
  },

  specialInstructions: {
    type: String,
    trim: true,
    default: ''
  },

  // BOOKING STATUS

  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Bookings', bookingSchema);
