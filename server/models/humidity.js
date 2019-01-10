var mongo = require('../services/database');

var humiditySchema = mongo.Schema({
    name: String,
    date: Date,
    value: Number
});

var Humidity = mongo.model('Humidity', humiditySchema);

module.exports = Humidity;
