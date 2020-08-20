// Models
const Comment = require('../../models/Comment.model');
const User = require('../../models/User.model');

module.exports.getIndex = async (req, res) => {
    let { _articleId } = req.params;
    let result = { success: true };

    try {
        if (!_articleId) {
            throw new Error();
        }

        let comments = await Comment.find({ _articleId });

        comments = await Promise.all(comments.map(async (item) => {
            let user = await User.findById(item._userId);

            return { ...item, userName: user.name };
        }));

        result.comments = comments.sort((a,b) => a._doc.dateCreate.getTime() - b._doc.dateCreate.getTime());
        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}

module.exports.addComment = async (req, res) => {
    let { user } = res.locals;
    let { _articleId } = req.params;
    let { text } = req.body;
    let result = { success: true };

    try {
        if (!user || !_articleId || !text) {
            throw new Error();
        }

        let comment = new Comment({ _userId: user._id, _articleId, text });
        await comment.save();

        result.comment = { ...comment, userName: user.name };
        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}