const express = require('express');
const {registerUser,loginUser} = require('../controllers/auth');
const router = express.Router();
const authenticate =require('../middleware/authenticate');
const extractUser = require('../middleware/ExtractUser');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/authenticateUser').post(authenticate,extractUser);

module.exports = router;