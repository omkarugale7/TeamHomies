const User = require("./../model/user");
const Admin = require("./../model/admin");
const Log = require("./../model/log");

exports.webHome = async (req,res) => {
    const totalUsers = await User.find().count();
    const totalAdmins = await Admin.find().count();
    const logs = await Log.find({"login_date" : `${new Date().toDateString()}`});
    res.status(201).json({users: totalUsers,admins: totalAdmins,logs: logs});
}