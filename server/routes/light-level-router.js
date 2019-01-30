var express = require('express');
var lightLevelRouter = express.Router();
var LightLevel = require('../models/light-level');
var moment = require('moment');

lightLevelRouter.get('/', function (req, res) {
    if (req.query.start_date) {
        var startDate = moment(req.query.startDate);
        var endDate;
        if (req.query.end_date) {
            endDate = moment(req.query.endDate);
        } else {
            endDate = moment();
        }

        LightLevel.find({ 'date': {
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

    LightLevel.find(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.send(JSON.stringify(result));
    });
});

lightLevelRouter.post('/', function (req, res) {
    // @todo assign sensor name
    var sensor = 'Sensor One';
    var lightLevel = new LightLevel({
        sensor_name: sensor,
        date: moment.now(),
        value: req.body.value
    });

    lightLevel.save(function (err, result) {
        if (err) {
            console.error(err);
            res.status(400).send(JSON.stringify(err));
            return;
        }
        res.sendStatus(201);
    });
});

module.exports = lightLevelRouter;
