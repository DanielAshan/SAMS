const express = require('express');
const app = express();
const Temperature = require('./models/temperature');
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/temperature', (req, res) => {
    var record = new Temperature({
        name: 'Sensore One',
        date: Date(),
        value: Math.random()*10
    });
    record.save(function(err, record) {
        if (err) return console.error(err);
        console.log('Record saved');
    });
    res.send(record);
});

app.get('/tempList', (req, res) => {
    Temperature.find(function (err, records) {
        if (err) return console.error(err);
        res.send(records);
    });
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});

//Run app, then load http://localhost:8080 in a browser to see the output.