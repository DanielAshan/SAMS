var express = require('express');
var temperatureRouter = express.Router();
var Temperature = require('../models/temperature');
var moment = require('moment');

temperatureRouter.get('/', function (req, res) {
    if (req.query.start_date) {
        var startDate = moment(req.query.startDate);
        var endDate;
        if (req.query.end_date) {
            endDate = moment(req.query.endDate);
        } else {
            endDate = moment();
        }

        Temperature.find({ 'date': {
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

    Temperature.find(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.send(JSON.stringify(result));
    });
});

temperatureRouter.post('/', function (req, res) {
    // @todo assign sensor name
    var sensor = 'Sensor One';
    var temperature = new Temperature({
        sensor_name: sensor,
        date: moment.now(),
        value: req.body.value
    });

    temperature.save(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.sendStatus(201);
    });
});

module.exports = temperatureRouter;
