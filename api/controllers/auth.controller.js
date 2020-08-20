require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Models
const User = require('../../models/User.model');
const { use } = require('../routes/user.route');

module.exports.getToken = async (req, res) => {
    let { email, password } = req.body;
    let result = { success: true };

    try {
        let user = await User.findOne({ email });

        if(!user) {
            throw new Error('Không tìm thấy user');
        }

        let isTrue = await bcrypt.compare(password, user.password);

        if(!isTrue) {
            throw new Error('Sai mật khẩu');
        }

        let token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
        result.token = token;

        res.json(result);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
}