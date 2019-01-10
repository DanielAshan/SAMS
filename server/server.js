const express = require('express');
const app = express();
const Temperature = require('./models/temperature');
const cors = require('cors');

var bodyParser = require('body-parser');
var locationRouter = require('./routes/location-router');
var sensorRouter = require('./routes/sensor-router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  routers

app.use('/location', locationRouter);
app.use('/sensor', sensorRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/temperature', (req, res) => {
    var record = new Temperature({
        name: 'Sensor One',
        date: new Date(),
        value: req.body.temperature
    });
    record.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Record saved');
    });
    // res.send(record)
});

app.get('/temperature', (req, res) => {
    var record = new Temperature({
        name: 'Sensor One',
        date: new Date(),
        value: Math.random() * 10
    });
    record.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Record saved');
    });
    res.send(record);
});

app.get('/tempList', (req, res) => {
    Temperature.find(function (err, records) {
        if (err) return console.error(err);
        res.send(records);
    }).sort('-date').limit(10);
});

app.listen(8080, '0.0.0.0', () => {
    console.log('Example app listening on port 8080!');
});

// Run app, then load http://localhost:8080 in a browser to see the output.
