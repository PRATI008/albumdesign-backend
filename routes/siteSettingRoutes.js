const express = require('express')

const {getSiteSettings, updateSiteSettings} = require('../controllers/siteSettingController');

const router = express.Router();

//get site settings
router.get('/site-settings', getSiteSettings);

//save or update Site Settings
router.put('/site-settings',updateSiteSettings);

module.exports = router;