var mongo = require('../services/database');

var userFeedbackSchema = mongo.Schema({
    name: String,
    sensor_name: String,
    alarm: Boolean,
    mail_send: Boolean
});

var UserFeedback = mongo.model('Location', userFeedbackSchema);

module.exports = UserFeedback;
