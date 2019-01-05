var mongo = require('../services/database');

var locationSchema = mongo.Schema({
    name: String,
    value: Number
});

var Location = mongo.model('Location', locationSchema);

module.exports = Location;
