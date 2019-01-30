var mongo = require('../services/database');

var userFeedbackSchema = mongo.Schema({
    date: Date,
    feedback: String,
    category: String
});

var UserFeedback = mongo.model('Location', userFeedbackSchema);

module.exports = UserFeedback;
