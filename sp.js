var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var serialPort = new SerialPort("COM0", {
  parser: serialport.parsers.readline("\n"),
  baudrate: 9600
}, false); // this is the openImmediately flag [default is true]

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'tempaltes'));
app.use('/',express.static('./tempaltes'))

server.listen(8000);

app.get('/', function (req, res) {
  res.render('sp', {
    // date: new Date().toDateString()
  });
});


serialPort.open(function(error) {
  if (error) {
    console.log('failed to open: ' + error);
  } else {
    console.log('open');
    serialPort.on('data', function(data) {
      io.emit('dataishere',data.split('\t'))
    });
    // serialPort.write("ls\n", function(err, results) {
    //   console.log('err ' + err);
    //   console.log('results ' + results);
    // });
  }
});
