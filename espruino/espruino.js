var wifi = require("Wifi");
wifi.connect("MyNetwork", {password: "MyPassword"}, function(err){
              if(err) console.log(err);
              else console.log("Connected to wifi!");
});

wifi.getStatus();
wifi.getIP();

// DHT 11
var temperature;
var humidity;
var dht = require("DHT11").connect(NodeMCU.D1);

// DS18B20
var oneWire = new OneWire(NodeMCU.D2);
var tempSensor = require("DS18B20").connect(oneWire);

// BH1750
var i2c = new I2C();
i2c.setup({scl: NodeMCU.D3, sda: NodeMCU.D4 });
var bh = require("BH1750").connect(i2c);
bh.start(1);

// MQ-135
var mq135 = require("MQ135").connect(NodeMCU.A0);

//HC-SR501
setWatch(function(event) {
  console.log(event.state);
  console.log(event.time);
  console.log(Math.floor(Date.now() / 1000));
  console.log("Movement detected");
}, NodeMCU.D5, {repeat:true, edge:"rising"});

// LED Green, Yellow, Red
var greenLED = true; // D6
var yellowLED = false; // D7
var redLED = true; // D8

digitalWrite(NodeMCU.D6, greenLED);
digitalWrite(NodeMCU.D7, yellowLED);
digitalWrite(NodeMCU.D8, redLED);

setInterval(function() {
  greenLED = !greenLED;
  yellowLED = !yellowLED;
  redLED = !redLED;
  
  digitalWrite(NodeMCU.D6, greenLED);
  digitalWrite(NodeMCU.D7, yellowLED);
  digitalWrite(NodeMCU.D8, redLED);

  tempSensor.getTemp(function (temp) {
    console.log('Temp is: ' + temp);
  });
  console.log('Light level is: ' + bh.read());
  dht.read(function (sensor) {
    temperature = sensor.temp.toString();
    humidity = sensor.rh.toString();
    console.log("DHT11 temp read is: " + temperature);
    console.log("DHT11 humidity read is: " + humidity);
  });
  mq135.RZERO = mq135.getRZero();
  console.log("PPM: " + mq135.getCorrectedPPM(temperature, humidity));
}, 1000);