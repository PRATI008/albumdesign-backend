
const express = require('express');

const {
  addDesign,
  getAllDesigns,
  updateDesign,
  deleteDesign
} = require('../controllers/designController');

const router = express.Router();

// Add Design
router.post('/design', addDesign);

// Get All Designs
router.get('/designs', getAllDesigns);

// Update Design
router.put('/design/:id', updateDesign);

// Delete Design
router.delete('/design/:id', deleteDesign);

module.exports = router;
