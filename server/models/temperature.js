var mongo = require('../services/database');

var temperatureSchema = mongo.Schema({
    name: String,
    date: Date,
    value: Number
});

var Temperature = mongo.model('Temperature', temperatureSchema);

module.exports = Temperature;
