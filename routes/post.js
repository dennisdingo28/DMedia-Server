const express = require('express');
const router = express.Router();
const {createPost,updatePost,sharePost} = require('../controllers/post');

router.post('/create',createPost);
router.post('/sharePost/:id',sharePost);
router.route('/updatePost/:id').patch(updatePost);

module.exports = router;