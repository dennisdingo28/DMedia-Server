const express = require('express');
const router = express.Router();
const {createPost} = require('../controllers/create');

router.post('/post',createPost);

module.exports = router;