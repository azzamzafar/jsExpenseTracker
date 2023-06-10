const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.js')

router.post('/signup',authControllers.postAddUser);
module.exports = router;