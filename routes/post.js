const express = require('express');
const router = express.Router();
const {createPost,updatePost,sharePost,deletePost,sharedPost} = require('../controllers/post');

router.post('/create',createPost);
router.post('/sharePost/:id',sharePost);
router.route('/updatePost/:id').patch(updatePost);
router.delete('/delete/:id',deletePost);
router.get('/?',sharedPost);

module.exports = router;