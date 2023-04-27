const express = require('express');
const router = express.Router();
const {createPost,updatePost,sharePost,deletePost} = require('../controllers/post');

router.post('/create',createPost);
router.post('/sharePost/:id',sharePost);
router.route('/updatePost/:id').patch(updatePost);
router.delete('/delete/:id',deletePost);

module.exports = router;