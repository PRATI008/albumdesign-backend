
const mongoose = require('mongoose');
const Package = require('../models/Package');

// Add New Package
const addPackage = async (req, res) => {
  try {
    const { packageName, status } = req.body;

    if (!packageName || !packageName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Package Name is required'
      });
    }

    const packageData = await Package.create({
      packageName: packageName.trim(),
      status: status || 'Active'
    });

    res.status(201).json({
      success: true,
      message: 'Package Added Successfully',
      package: packageData
    });

  } catch (error) {
    console.error('Add Package Error:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      packages
    });

  } catch (error) {
    console.error('Get Packages Error:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Package
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageName, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Package ID'
      });
    }

    const updateData = {};

    if (packageName !== undefined) {
      if (!packageName.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Package Name cannot be empty'
        });
      }

      updateData.packageName = packageName.trim();
    }

    if (status !== undefined) {
      if (!['Active', 'Inactive'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Package Status'
        });
      }

      updateData.status = status;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: 'Package Not Found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package Updated Successfully',
      package: updatedPackage
    });

  } catch (error) {
    console.error('Update Package Error:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Package
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Package ID'
      });
    }

    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: 'Package Not Found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package Deleted Successfully'
    });

  } catch (error) {
    console.error('Delete Package Error:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addPackage,
  getAllPackages,
  updatePackage,
  deletePackage
};
