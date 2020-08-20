require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models/User.model');
const { use } = require('../routes/user.route');

module.exports.postCreate = async (req, res) => {
    let { name, email, password } = req.body;
    let result = { success: true };

    try {
        password = await bcrypt.hash(password, 10);
        let user = new User({ ...req.body, password });
        await user.save();

        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
    }
}

module.exports.getIndex = (req, res) => {
    let { user } = res.locals;
    let result = { success: true };

    if (!user) {
        result.success = false;
        res.json(result);
        return;
    }

    result.user = user;
    res.json(result);
}

module.exports.addFriend = async (req, res) => {
    let { user } = res.locals;
    let { _friendId } = req.params;
    let result = { success: true };

    if (!user || !_friendId) {
        result.success = false;
        res.json(result);
        return;
    }

    try {
        await User.findOneAndUpdate({ _id: user._id }, { $addToSet: { friends: _friendId } });
        await User.findOneAndUpdate({ _id: _friendId }, { $addToSet: { friends: user._id.toString() } });
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }

    res.json(result);
}

module.exports.getNoFriends = async (req, res) => {
    let { user } = res.locals;
    let result = { success: true };

    if (!user) {
        result.success = false;
        res.json(result);
        return;
    }

    try {
        let friends = await User.find({ _id: { $nin: [user._id, ...user.friends] } });
        result.friends = friends;
        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}
