var mongo = require('../services/database');

var userFeedbackSchema = mongo.Schema({
    date: Date,
    feedback: String,
    category: String
});

var UserFeedback = mongo.model('UserFeedback', userFeedbackSchema);

module.exports = UserFeedback;
