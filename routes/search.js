const express = require('express');
const router = express.Router();

const {searchUser,searchUserById,searchAllPosts,searchPostById,searchPost}=require('../controllers/search');

router.get('/user/?',searchUser);
router.get('/allPosts',searchAllPosts);
router.get('/userId/:userId',searchUserById);
router.get('/post/:id',searchPostById)
router.get('/post/?',searchPost);

module.exports = router;