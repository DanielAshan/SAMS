var express = require('express');
var Sensor = require('../models/sensor');
var sensorRouter = express.Router();
var uuid = require('uuid');
var moment = require('moment');

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
        sensor_name: req.body.name
    });
    sensor.save(function (err, record) {
        if (err) return console.error(err);
        console.log('sensor saved');
        res.status(201).send(JSON.stringify(sensor));
    });
});

sensorRouter.put('/:sensorId', function (req, res) {
    console.log(req.body);
    if (req.body.sensor_name == null || req.body.sensor_name === undefined) {
        res.sendStatus(422);
        return;
    }

    Sensor.findOneAndUpdate({ _id: req.params.sensorId }, { sensor_name: req.body.sensor_name,
        output1: req.body.output1,
        output2: req.body.output2,
        output3: req.body.output3
    }, function (err, result) {
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
        res.sendStatus(204);
    });
});

sensorRouter.get('/register', function (req, res) {
    console.log('Register accessed');
    var sensor = new Sensor({
        sensor_name: 'Sensor ' + req.ip,
        ip_address: req.ip,
        access_key: uuid.v4(),
        output1: false,
        output2: false,
        output3: false
    });
    sensor.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Sensor saved - access_key');
        console.log(record.access_key);
        var json = JSON.stringify({ access_key: sensor.access_key });
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', json.length);
        res.status(201).send(json);
    });
});

sensorRouter.get('/test', function (req, res) {
    Sensor.findOneAndUpdate({ access_key: req.headers['Access-Key'] }, {
        expireAt: moment().add('10', 'minutes')
    }, function (err, doc, res) {
        if (err) return console.error(err);
        res.send(JSON.stringify(doc.expireAt));
    });
});

module.exports = sensorRouter;
