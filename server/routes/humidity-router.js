var express = require('express');
var humidityRouter = express.Router();
var Humidity = require('../models/humidity');
var moment = require('moment');

humidityRouter.get('/', function (req, res) {
    if (req.query.start_date) {
        var startDate = moment(req.query.startDate);
        var endDate;
        if (req.query.end_date) {
            endDate = moment(req.query.endDate);
        } else {
            endDate = moment();
        }

        Humidity.find({ 'date': {
            '$gte': startDate,
            '$lt': endDate
        } }, function (err, result) {
            if (err) {
                console.error(err);
                res.status(400).send(JSON.stringify(err));
                return;
            }
            res.send(JSON.stringify(result));
        });
    }

    Humidity.find(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.send(JSON.stringify(result));
    });
});

humidityRouter.post('/', function (req, res) {
    // @todo assign sensor name
    var sensor = 'Sensor One';
    var humidity = new Humidity({
        sensor_name: sensor,
        date: moment.now(),
        value: req.body.value
    });

    humidity.save(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.sendStatus(201);
    });
});

module.exports = humidityRouter;
