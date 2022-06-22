const User = require('./../model/user');

exports.userList = async () => {
    const Users = await User.find();
    return Users;
} 