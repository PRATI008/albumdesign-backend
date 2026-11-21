
const Enquiry = require('../models/Enquiry');

// CREATE ENQUIRY
const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone and message are required'
      });
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      service: service ? service.trim() : '',
      message: message.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry
    });

  } catch (error) {
    console.log('Create Enquiry Error:', error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET ALL ENQUIRIES
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      enquiries
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE ENQUIRY
const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE ENQUIRY
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry
};
