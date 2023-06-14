const express = require('express');
const {registerUser, authUser, allUsers} = require('../controllers/UserController');
const { protect } = require('../middleware/autthMiddleware');
const router = express.Router();


router.post('/create', registerUser);
router.post('/login',authUser);
router.get('/getall',protect,allUsers);

module.exports = router;