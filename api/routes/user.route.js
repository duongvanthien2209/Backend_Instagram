const express = require('express');
const router = express.Router();

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');

// Controllers
const userController = require('../controllers/user.controller');

router.post('/create', userController.postCreate);

router.use(authMiddleware.checkLogin);

// Lấy thông tin user
router.get('/', userController.getIndex);

// Thêm bạn
router.get('/:_friendId/addFriend', userController.addFriend);

// Lấy danh sách những người chưa kết bạn
router.get('/noFriends', userController.getNoFriends);

module.exports = router;