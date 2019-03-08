const mongoose = require('mongoose')

let authSchema = new mongoose.Schema({
    username : String,
    password : String
});

let authModel = mongoose.model('auths',authSchema);

module.exports = authModel;