const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: { type: String, default: "https://picsum.photos/200" },
    friends: { type: Array, default: []} 
});

const User = mongoose.model('User', schema, 'users');
module.exports = User;