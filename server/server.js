const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

var locationRouter = require('./routes/location-router');
var sensorRouter = require('./routes/sensor-router');
var userFeedbackRouter = require('./routes/user-feedback-router');
var temperatureRouter = require('./routes/temperature-router');
var humidityRouter = require('./routes/humidity-router');
var lightLevelRouter = require('./routes/light-level-router');
var airQualityRouter = require('./routes/air-quality-router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  routers
app.use('/location', locationRouter);
app.use('/sensor', sensorRouter);
app.use('/userFeedback', userFeedbackRouter);
app.use('/temperature', temperatureRouter);
app.use('/humidity', humidityRouter);
app.use('/lightLevel', lightLevelRouter);
app.use('/airQuality', airQualityRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, '0.0.0.0', () => {
    console.log('API server listening on adress 0.0.0.0, port 8080!');
});

// Run app, then load http://localhost:8080 in a browser to see the output.
