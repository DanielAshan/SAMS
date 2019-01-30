var mongo = require('../services/database');

var airQualitySchema = mongo.Schema({
    sensor_name: String,
    date: Date,
    value: Number
});

var AirQuality = mongo.model('AirQuality', airQualitySchema);

module.exports = AirQuality;
