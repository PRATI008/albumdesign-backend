const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
  {
    designStyle: {
      type: String,
      required: [true, 'Design Style is required'],
      trim: true
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Design', designSchema);