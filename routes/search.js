const express = require('express');
const router = express.Router();

const {searchUser,searchAllPosts}=require('../controllers/search');

router.get('/user/?',searchUser);
router.get('/allPosts',searchAllPosts);

module.exports = router;