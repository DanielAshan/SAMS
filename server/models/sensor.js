var mongo = require('../services/database');

var sensorSchema = mongo.Schema({
    id: Number,
    name: String,
    access_key: String,
    ip_address: String
});

var Sensor = mongo.model('Sensor', sensorSchema);

module.exports = Sensor;
