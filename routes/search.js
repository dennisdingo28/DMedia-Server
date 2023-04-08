const express = require('express');
const router = express.Router();

const {searchUser,searchUserById,searchAllPosts,searchPostById}=require('../controllers/search');

router.get('/user/?',searchUser);
router.get('/allPosts',searchAllPosts);
router.get('/userId/:userId',searchUserById);
router.get('/post/:id',searchPostById)

module.exports = router;