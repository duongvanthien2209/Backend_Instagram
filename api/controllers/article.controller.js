// Models
const Article = require('../../models/Article.model');
const User = require('../../models/User.model');
const Comment = require('../../models/Comment.model');

module.exports.getIndex = async (req, res) => {
    let { user } = res.locals;
    let result = { success: true };

    try {
        if (!user) {
            throw new Error();
        }

        let articles = await Article.find({ _userId: { $in: [user._id, ...user.friends] } });

        result.articles = articles.sort((a, b) => b.dateCreate.getTime() - a.dateCreate.getTime());
        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}

module.exports.add = async (req, res) => {
    let { user } = res.locals;
    let file = req.file;
    let { description } = req.body;
    let result = { success: true };

    try {
        if (!file || !user || !description) {
            throw new Error();
        }

        let image = file.path.split('\\').slice(1).join('/');
        let article = new Article({ image, description, _userId: user._id });

        await article.save();
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }

    res.json(result);
}

module.exports.getCurrentUser = async (req, res) => {
    let { _userId } = req.params;
    let result = { success: true };

    try {
        if (!_userId) {
            throw new Error();
        }

        let currentUser = await User.findById(_userId);
        result.currentUser = currentUser;
        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}

module.exports.addLike = async (req, res) => {
    let { user } = res.locals;
    let { _articleId } = req.params;
    let result = { success: true };

    try {
        if (!user || !_articleId) {
            throw new Error();
        }

        // Kiểm tra nếu ko có thì thêm vào, còn nếu có rồi thì lấy ra - likes
        let article = await Article.findOne({ _id: _articleId, likes: user._id });

        if (!article) {
            await Article.findOneAndUpdate({ _id: _articleId }, { $push: { likes: user._id } });
        } else {
            await Article.findOneAndUpdate({ _id: _articleId }, { $pull: { likes: user._id } });
        }

        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}

module.exports.getArticleByUser = async (req, res) => {
    let { _userId } = req.params;
    let result = { success: true };

    try {
        if(!_userId) {
            throw new Error();
        }

        let articles = await Article.find({ _userId });

        articles = await Promise.all(articles.map(async item => {
            let comments = await Comment.find({ _articleId: item._articleId });

            // item.countComment = comments.length;
            return {...item, countComment: comments.length };
        }));

        result.articles = articles;
        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}