var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var fs = require('fs');

var serialPort = new SerialPort("COM6", {
  parser: serialport.parsers.readline("\n"),
  baudrate: 9600
}, false); // this is the openImmediately flag [default is true]

// app.set('view engine', 'jade');
// app.set('views', path.join(__dirname, 'tempaltes'));
 app.use('/js/',express.static('./js'))
 app.use('/css/',express.static('./css'))
  app.use('/imgs/',express.static('./imgs'))
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


    serialPort.open(function(error) {
          if (error) {
            console.log('failed to open: ' + error);
          } else {
            console.log('open');
            io.on('connection', function(socket) {
              serialPort.on('data', function(data) {
                socket.emit('dataishere', data.split('\t'))
              })
              socket.on('setspeed',function(data){
                console.log('haha'+data)
              })
            });
        // serialPort.write("ls\n", function(err, results) {
        //   console.log('err ' + err);
        //   console.log('results ' + results);
        // });
      }
    });
