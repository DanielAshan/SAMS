var mongo = require('../services/database');

var locationSchema = mongo.Schema({
    name: String,
    sensor_name: String,
    alarm: Boolean,
    mail_send: Boolean
});

var Location = mongo.model('Location', locationSchema);

module.exports = Location;
