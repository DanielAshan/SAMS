//configuration const 
const server_address = "192.168.0.121";
const network_name = "MyNetwork";
const network_password = "MyPassword";

// global variables
var access_key;

// main libs
var wifi = require("Wifi");
var http = require("http");

//functions
function sendData(path, value) {
  var payload = JSON.stringify(value);
  var options = {
    host: server_address,
    port: 8080,
    path: path,
    method: "POST",
    protocol: "http",
    headers: {
      "Content-Length": payload.length,
      "Authorization": access_key,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
  var request = http.request(options, function (res) {
    res.on("error", function (error) {
      console.log('Error ', error);
    })
  })
  request.write(payload);
  request.end();
}

function readData() {
  var options = {
    host: server_address,
    port: 8080,
    path: "/sensor/output",
    method: "GET",
    protocol: "http",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
  http.request(options, function (res) {
    var output = "";
    res.on("data", function (data) {
      output += data;
    });
    res.on("close", function (data) {
      output = JSON.parse(output);
      greenLED = output.output1;
      yellowLED = output.output2;
      redLED = output.output3;
    });
  });
}

function registerDevice() {
  var options = {
    host: server_address,
    port: 8080,
    path: "/sensor/register",
    method: "GET",
    protocol: "http",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
  http.request(options, function (res) {
    var output = "";
    res.on("data", function (data) {
      output += data;
    });
    res.on("close", function (data) {
      output = JSON.parse(output);
      access_key = output;
      clearInterval(interval)
    });
  });
}

wifi.connect(network_name, {
  password: network_password
}, function (err) {
  if (err) console.log(err);
  else console.log("Connected to wifi!");
});

wifi.getStatus();
wifi.getIP();

// DHT 11
var dht = require("DHT11").connect(NodeMCU.D1);

// DS18B20
var oneWire = new OneWire(NodeMCU.D2);
var tempSensor = require("DS18B20").connect(oneWire);

// BH1750
var i2c = new I2C();
i2c.setup({
  scl: NodeMCU.D3,
  sda: NodeMCU.D4
});
var bh = require("BH1750").connect(i2c);
bh.start(1);

// MQ-135
var mq135 = require("MQ135").connect(NodeMCU.A0);

//HC-SR501
setWatch(function (event) {
  sendData("/sensor/alarm", 1);
}, NodeMCU.D5, {
  repeat: true,
  edge: "rising"
});

// LED Green, Yellow, Red
var greenLED = false; // D6
var yellowLED = false; // D7
var redLED = false; // D8

setInterval(function () {

  digitalWrite(NodeMCU.D6, greenLED);
  digitalWrite(NodeMCU.D7, yellowLED);
  digitalWrite(NodeMCU.D8, redLED);

  tempSensor.getTemp(function (temp) {
    console.log('Temp is: ' + temp);
  });
  ll = bh.read();
  console.log('Light level is: ' + ll);
  sendData('/lightLevel', ll);
  dht.read(function (sensor) {
    var t = sensor.temp.toString();
    var rh = sensor.rh.toString();
    console.log("DHT11 temp read is: " + t);
    console.log("DHT11 humidity read is: " + rh);
    sendData("/temperature/", t);
    sendData("/humidity/", rh);
    mq135.RZERO = mq135.getRZero();
    var ppm = mq135.getCorrectedPPM(t, rh)
    console.log("PPM: " + ppm);
    sendData("/airQuality/", ppm);
  });

}, 10 * 60000);

setInterval(function () {
  readData();
}, 60000)

if (!access_key) {
  var interval = setInterval(function () {
    registerDevice();
  }, 60000)
}