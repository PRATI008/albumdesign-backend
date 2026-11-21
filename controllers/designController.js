
const mongoose = require('mongoose');
const Design = require('../models/Design');

// ======================================
// 1. ADD NEW DESIGN
// ======================================
const addDesign = async (req, res) => {
  try {
    const { designStyle, status } = req.body;

    // Validate Design Style
    if (
      !designStyle ||
      typeof designStyle !== 'string' ||
      !designStyle.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Design Style is required'
      });
    }

    // Validate Status
    const selectedStatus = status || 'Active';

    if (!['Active', 'Inactive'].includes(selectedStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Design Status'
      });
    }

    // Create Design
    const design = await Design.create({
      designStyle: designStyle.trim(),
      status: selectedStatus
    });

    return res.status(201).json({
      success: true,
      message: 'Design Added Successfully',
      design
    });

  } catch (error) {
    console.error('Add Design Error:', error);

    return res.status(400).json({
      success: false,
      message: error.message || 'Unable to add design'
    });
  }
};


// ======================================
// 2. GET ALL DESIGNS
// ======================================
const getAllDesigns = async (req, res) => {
  try {

    const designs = await Design.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: designs.length,
      designs
    });

  } catch (error) {
    console.error('Get Designs Error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to fetch designs'
    });
  }
};


// ======================================
// 3. UPDATE DESIGN
// ======================================
const updateDesign = async (req, res) => {
  try {

    const { id } = req.params;
    const { designStyle, status } = req.body;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Design ID'
      });
    }

    const updateData = {};

    // Update Design Style
    if (designStyle !== undefined) {

      if (
        typeof designStyle !== 'string' ||
        !designStyle.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: 'Design Style cannot be empty'
        });
      }

      updateData.designStyle = designStyle.trim();
    }

    // Update Status
    if (status !== undefined) {

      if (!['Active', 'Inactive'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Design Status'
        });
      }

      updateData.status = status;
    }

    // Check Empty Update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide data to update'
      });
    }

    // Update in MongoDB
    const design = await Design.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    );

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design Not Found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Design Updated Successfully',
      design
    });

  } catch (error) {
    console.error('Update Design Error:', error);

    return res.status(400).json({
      success: false,
      message: error.message || 'Unable to update design'
    });
  }
};


// ======================================
// 4. DELETE DESIGN
// ======================================
const deleteDesign = async (req, res) => {
  try {

    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Design ID'
      });
    }

    // Delete Design
    const design = await Design.findByIdAndDelete(id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design Not Found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Design Deleted Successfully'
    });

  } catch (error) {
    console.error('Delete Design Error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to delete design'
    });
  }
};


// ======================================
// EXPORT ALL FUNCTIONS
// ======================================
module.exports = {
  addDesign,
  getAllDesigns,
  updateDesign,
  deleteDesign
};
