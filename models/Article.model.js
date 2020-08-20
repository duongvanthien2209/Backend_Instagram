const mongoose = require('mongoose');
const schema = mongoose.Schema({
    image: String,
    description: String,
    dateCreate: { type: Date, default: Date.now },
    _userId: String,
    likes: { type: Array, default: [] }
});

const Article = mongoose.model('Article', schema, 'articles');
module.exports = Article;