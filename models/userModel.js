let mongoose = require('mongoose');

let api_schema = new mongoose.Schema({
    name : String,
    roll : String,
    phone : String,
    address : String

});

var api_model = mongoose.model('apis',api_schema);

module.exports = api_model;