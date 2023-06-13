const express = require('express');
const {registerUser, authUser} = require('../controllers/UserController');
const router = express.Router();


router.post('/create', registerUser)
router.post('/login',authUser);

module.exports = router;