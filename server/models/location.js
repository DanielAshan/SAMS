var mongo = require('../services/database');

var locationSchema = mongo.Schema({
    name: String
});

var Location = mongo.model('Location', locationSchema);

module.exports = Location;
