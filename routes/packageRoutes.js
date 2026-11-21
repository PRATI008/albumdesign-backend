
const express = require('express');

const {
  addPackage,
  getAllPackages,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');

const router = express.Router();

// Create New Package
router.post('/package', addPackage);

// Get All Packages
router.get('/packages', getAllPackages);

// Update Existing Package
router.put('/package/:id', updatePackage);

// Delete Package
router.delete('/package/:id', deletePackage);

module.exports = router;
