const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema(
    {
        mobile:{
            type: String,
            required: [true, 'Mobile Number is required'],
            trim : true
        },
        email:{
            type: String,
            required: [true, 'Email Address is required'],
            trim: true,
            lowercase: true

        },
        address: {
            type: String,
            required:[true, 'Address is required'],
            trim: true
        },
         facebook: {
      type: String,
      default: '',
      trim: true
    },
    instagram: {
      type: String,
      default: '',
      trim: true
    },
    linkedin: {
      type: String,
      default: '',
      trim: true
    }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('SiteSetting',siteSettingSchema);