
const express = require('express');
const router = express.Router();

const {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry
} = require('../controllers/enquiryController');

// CREATE ENQUIRY
router.post('/enquiry', createEnquiry);

// GET ALL ENQUIRIES
router.get('/enquiries', getEnquiries);

// UPDATE ENQUIRY
router.put('/enquiry/:id', updateEnquiry);

// DELETE ENQUIRY
router.delete('/enquiry/:id', deleteEnquiry);

module.exports = router;
