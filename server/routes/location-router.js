var express = require('express');
var Sensor = require('../models/sensor');
var sensorRouter = express.Router();

sensorRouter.get('/', function (req, res) {
    Sensor.find(function (err, result) {
        if (err) {
            res.status(400).send(JSON.stringify(err));
            return;
        }
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

sensorRouter.get('/generateDummy', function (req, res) {
    var location = new Sensor({
        name: 'Dummy Sensor',
        access_key: '1234-5678-9123',
        ip_address: '192.1.1.1'
    });
    location.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Location saved');
        res.status(201).send(JSON.stringify(location));
    });
});

sensorRouter.post('/', function (req, res) {
    if (req.body.name == null || req.body.name === undefined) {
        res.sendStatus(422);
        return;
    }

    var sensor = new Sensor({
        name: req.body.name
    });
    sensor.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Location saved');
        res.status(201).send(JSON.stringify(sensor));
    });
});

sensorRouter.put('/:sensorId', function (req, res) {
    if (req.body.name == null || req.body.name === undefined) {
        res.sendStatus(422);
        return;
    }

    Sensor.findOneAndUpdate({ _id: req.params.sensorId }, { name: req.body.name }, function (err, result) {
        if (err) {
            res.status(404).send(JSON.stringify(err));
            return;
        }
        console.log('Sensor updated ' + req.params.sensorId);
        res.status(204).send(JSON.stringify(result));
    });
});

sensorRouter.delete('/:sensorId', function (req, res) {
    Sensor.findOneAndDelete({ _id: req.params.sensorId }, function (err, result) {
        if (err) {
            res.status(404).send(JSON.stringify(err));
            return;
        }
        console.log('Sensor deleted ' + req.params.sensorId);
        res.sendStatus(204);
    });
});

module.exports = sensorRouter;
