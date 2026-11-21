const express = require('express')
const {setupAdmin, loginAdmin} = require('../controllers/authController');
const router = express.Router();

router.post('/setup-admin', setupAdmin);
router.post('/login',loginAdmin)

module.exports = router;