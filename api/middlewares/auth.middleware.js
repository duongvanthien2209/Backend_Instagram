require('dotenv').config();
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models/User.model');

module.exports.checkLogin = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
        res.json({ success: false });
        return;
    }

    try {
        let decode = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        let user = await User.findById(decode._id);

        if (!user) {
            throw new Error();
        }

        res.locals.user = user;
        next();
    } catch (error) {
        res.json({ success: false });
        return;
    }
}