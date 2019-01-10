var wifi = require("Wifi");
wifi.connect("MyNetwork", {password: "MyPassword"}, function(err){
              if(err) console.log(err);
              else console.log("Connected to wifi!");
});

wifi.getStatus();
wifi.getIP();

var D4= new Pin("D4");
var ow = new OneWire(D4);
var sensor = require("DS18B20").connect(ow);


function sendData(temp) {
    var temperature = {
    temperature: temp,
  };
    var content = JSON.stringify(temperature);
  var options = {
    host: '192.168.0.121', // host name
    port: 8080,            // (optional) port, defaults to 80
    path: '/temperature',           // path sent to server
    method: 'POST',
    headers: { 
      "Content-Type" : "application/json",
      "Content-Length": content.length
    } 
  };
  
  
  var req = require("http").request(options, function(res) {
    
    console.log('res',res);
    
     res.on('error', function(data) {
      console.log("error> "+data);
    });
    
    res.on('data', function(data) {
      console.log("HTTP> "+data);
    });
    res.on('close', function(data) {
      console.log("Connection closed");
    });
  });
  
  req.end(content);  
  console.log(content);
  console.log("Request sent"); 
}

 setInterval(function() {
   sensor.getTemp(function (temp) {
     sendData(temp);
     console.log("Temp is "+temp+"°C");
   });
 }, 10000);