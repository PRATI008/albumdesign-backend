
const SiteSetting = require('../models/siteSettings');

// Get Site Settings
const getSiteSettings = async (req, res) => {
  try {
    const settings = await SiteSetting.findOne();

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Site Settings not found'
      });
    }

    res.status(200).json({
      success: true,
      settings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Add or Update Site Settings
const updateSiteSettings = async (req, res) => {
  try {
    const {
      mobile,
      email,
      address,
      facebook,
      instagram,
      linkedin
    } = req.body;

    if (!mobile || !email || !address) {
      return res.status(400).json({
        success: false,
        message: 'Mobile, Email and Address are required'
      });
    }

    let settings = await SiteSetting.findOne();

    const updatedData = {
      mobile,
      email,
      address,
      facebook: facebook || '',
      instagram: instagram || '',
      linkedin: linkedin || ''
    };

    if (settings) {
      Object.assign(settings, updatedData);
      await settings.save();
    } else {
      settings = await SiteSetting.create(updatedData);
    }

    res.status(200).json({
      success: true,
      message: 'Site Settings updated successfully',
      settings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getSiteSettings,
  updateSiteSettings
};
