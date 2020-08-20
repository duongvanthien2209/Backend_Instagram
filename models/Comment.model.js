const mongoose = require('mongoose');
const schema = mongoose.Schema({
    _articleId: String,
    _userId: String,
    text: String,
    dateCreate: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', schema, 'comments');
module.exports = Comment;