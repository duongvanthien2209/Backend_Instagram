const express = require('express');
const router = express.Router();

// Middlewares
const authMiddleware = require('../api/middlewares/auth.middleware');

// Routes
const userRoute = require('../api/routes/user.route');
const authRoute = require('../api/routes/auth.route');
const articleRoute = require('../api/routes/article.route');
const commentRoute = require('../api/routes/comment.route');

router.use('/users', userRoute);

router.use('/auth', authRoute);

router.use(authMiddleware.checkLogin);

router.use('/articles', articleRoute);

router.use('/comments', commentRoute);

module.exports = router;