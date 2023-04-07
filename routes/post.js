const express = require('express');
const router = express.Router();
const {createPost,updatePost} = require('../controllers/post');

router.post('/create',createPost);
router.route('/updatePost/:id').patch(updatePost);

module.exports = router;