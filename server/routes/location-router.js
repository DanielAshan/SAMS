var express = require('express');
var Location = require('../models/location');
var locationRouter = express.Router();

locationRouter.get('/', function (req, res) {
    Location.find(function (err, result) {
        if (err) {
            res.status(400).send(JSON.stringify(err));
            return;
        }
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

locationRouter.get('/generateDummy', function (req, res) {
    var location = new Location({
        name: 'Dummy location'
    });
    location.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Location saved');
        res.status(201).send(JSON.stringify(location));
    });
});

locationRouter.post('/', function (req, res) {
    if (req.body.name == null || req.body.name === undefined) {
        res.sendStatus(422);
        return;
    }

    var location = new Location({
        name: req.body.name,
        sensor_name: req.body.sensor_name
    });
    location.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Location saved');
        res.status(201).send(JSON.stringify(location));
    });
});

locationRouter.put('/:locationId', function (req, res) {
    if (req.body.name == null || req.body.name === undefined) {
        res.sendStatus(422);
        return;
    }
    console.log(req.body);
    Location.findOneAndUpdate({ _id: req.params.locationId }, { name: req.body.name, sensor_name: req.body.sensor_name }, function (err, result) {
        if (err) {
            res.status(404).send(JSON.stringify(err));
            return;
        }
        console.log('Location updated ' + req.params.locationId);
        res.status(204).send(JSON.stringify(result));
    });
});

locationRouter.delete('/:locationId', function (req, res) {
    Location.findOneAndDelete({ _id: req.params.locationId }, function (err, result) {
        if (err) {
            res.status(404).send(JSON.stringify(err));
            return;
        }
        console.log('Location deleted ' + req.params.locationId);
        res.sendStatus(204);
    });
});

module.exports = locationRouter;
