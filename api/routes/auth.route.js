const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');

// Lấy token - Login
router.post('/', authController.getToken);

module.exports = router;