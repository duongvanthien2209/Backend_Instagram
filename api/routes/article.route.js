const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'public/uploads/' });
const router = express.Router();

// Controllers
const articleController = require('../controllers/article.controller');

// Lấy bài viết
router.get('/', articleController.getIndex);

// Thêm bài viết
router.post('/add', upload.single('image'), articleController.add);

// Lấy chủ bài viết
router.get('/:_userId/currentUser', articleController.getCurrentUser);

// Thêm lượt like
router.get('/:_articleId/addLike', articleController.addLike);

// Lấy tất cả bài viết của một user cụ thể
router.get('/:_userId', articleController.getArticleByUser);
module.exports = router;