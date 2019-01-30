var express = require('express');
var airQualityRouter = express.Router();
var AirQuality = require('../models/air-quality');
var moment = require('moment');

airQualityRouter.get('/', function (req, res) {
    if (req.query.start_date) {
        var startDate = moment(req.query.startDate);
        var endDate;
        if (req.query.end_date) {
            endDate = moment(req.query.endDate);
        } else {
            endDate = moment();
        }

        AirQuality.find({ 'date': {
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

    AirQuality.find(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.send(JSON.stringify(result));
    });
});

airQualityRouter.post('/', function (req, res) {
    // @todo assign sensor name
    var sensor = 'Sensor One';
    var airQuality = new AirQuality({
        sensor_name: sensor,
        date: moment.now(),
        value: req.body.value
    });

    airQuality.save(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.sendStatus(201);
    });
});

module.exports = airQualityRouter;
