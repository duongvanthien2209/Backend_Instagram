const express = require('express');
const router = express.Router();

// Controllers
const commentController = require('../controllers/comment.controller');

// Lấy danh sách comments thuộc 1 bài viết
router.get('/:_articleId', commentController.getIndex);

// Thêm comment vào 1 bài viết
router.post('/:_articleId/add', commentController.addComment);

module.exports = router;