const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.js')

router.post('/signup',authControllers.postAddUser);
router.post('/login',authControllers.postLoginUser)

module.exports = router;