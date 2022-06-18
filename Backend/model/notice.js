var mongoose = require('mongoose');
  
var noticeSchema = new mongoose.Schema({
    title: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

  
module.exports = new mongoose.model('Notice', noticeSchema);