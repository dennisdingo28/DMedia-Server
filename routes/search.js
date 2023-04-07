const express = require('express');
const router = express.Router();

const {searchUser,searchUserById,searchAllPosts}=require('../controllers/search');

router.get('/user/?',searchUser);
router.get('/allPosts',searchAllPosts);
router.get('/userId/:userId',searchUserById);

module.exports = router;