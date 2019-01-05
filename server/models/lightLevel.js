var mongo = require('../services/database');

var lightLevelSchema = mongo.Schema({
    name: String,
    date: Date,
    value: Number
});

var LightLevel = mongo.model('LightLevel', lightLevelSchema);

module.exports = LightLevel;
