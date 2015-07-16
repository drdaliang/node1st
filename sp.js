var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var fs = require('fs');

var serialPort = new SerialPort("COM5", {
  parser: serialport.parsers.readline("\n"),
  baudrate: 9600
}, false); // this is the openImmediately flag [default is true]

// app.set('view engine', 'jade');
// app.set('views', path.join(__dirname, 'tempaltes'));
app.use('/js/', express.static('./js'))
app.use('/css/', express.static('./css'))
app.use('/imgs/', express.static('./imgs'))
app.use('/fonts/', express.static('./fonts'))
server.listen(8000);

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/modeA.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading modeA.html');
      }
      res.writeHead(200);
      res.end(data);
    });
});
app.get('/MODE-B', function(req, res) {
  fs.readFile(__dirname + '/modeB.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading modeB.html');
      }
      res.writeHead(200);
      res.end(data);
    });
});
app.get('/MODE-A', function(req, res) {
  fs.readFile(__dirname + '/modeA.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading modeA.html');
      }
      res.writeHead(200);
      res.end(data);
    });
});

app.get('/SENSOR-MONITOR', function(req, res) {
  fs.readFile(__dirname + '/modeOptionSensorMonitor.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading modeOptionSensorMonitor.html');
      }
      res.writeHead(200);
      res.end(data);
    });
});

app.get('/CALIBRATION', function(req, res) {
  fs.readFile(__dirname + '/modeOptionCalibration.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading modeOptionCalibration.html');
      }
      res.writeHead(200);
      res.end(data);
    });
});

serialPort.open(function(error) {
  if (error) {
    console.log('failed to open: ' + error);
  } else {
    console.log('open');
    io.on('connection', function(socket) {
      serialPort.on('data', function(data) {
        // socket.emit('dataishere', data.split('\t'))
        try {
          dataBuffer = JSON.parse(data);
      //    console.log(dataBuffer);
          socket.emit('dataishere', dataBuffer);
        } catch (e) {
          console.log(e)
        }
      });
      serialPort.on('error', function(error) {
        console.log(error);
      });
      socket.on('setspeed', function(data) {
        console.log('haha' + data)
        serialPort.write(data + '\n', function(err, results) {
          console.log('err ' + err);
          console.log('results ' + results);
        })
      });
      socket.on('eventishere', function(data) {
        console.log('haha' + data)
        serialPort.write(data + '\n', function(err, results) {
          console.log('err ' + err);
          console.log('results ' + results);
        })
      });

    });
  }
});
