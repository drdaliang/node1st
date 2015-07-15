var socket = io('http://localhost:8000');
var sensordata;
var linedata = [
  // { label: 'Layer 1', values: [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 3} ] },
  { label: 'Layer 1', values: [] },
  { label: 'Layer 2', values: [] }
];
var lineChartInstance = $('#lineChart').epoch({
  type: 'line',
  data: linedata,
  axes: ['left', 'right', 'bottom']
});

var gaugeChartInstance1 = $('#gaugeChart1').epoch({
  type: 'time.gauge',
  value: 0.5
});

var gaugeChartInstance2 = $('#gaugeChart2').epoch({
  type: 'time.gauge',
  value: 0.5,
  // domain: [0,100],
  format: function(v) {return (v*3600).toFixed(1)},
});

function emitspeed() {
  socket.emit('setspeed',JSON.stringify({motorSpeedSet : Math.round(Number($('#SpeedInput').val()))}));
  console.log('haha');
  // $('#m').val('');
  return false;
};

function updateUI() {
  $('#datatable').append('<tr> <td> '+sensordata.time+'</td> <td>'+sensordata.motorspeed+'</td> <td>'+sensordata.torque+'</td> <td> '+sensordata.atm+'</td> </tr>');
  linedata[0].values.push({x:sensordata.motorspeed,y:sensordata.torque});
  lineChartInstance.update(linedata);
};


socket.on('dataishere', function(data) {
  sensordata = data;
  console.log(data);
  gaugeChartInstance1.push(data["motorSpeed"]/100);
  gaugeChartInstance2.push(data["motorSpeed"]/3600);
  // socket.emit('my other event', {
  //   my: 'data'
  // });
});
