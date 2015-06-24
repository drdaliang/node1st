var socket = io('http://localhost:8000');
var data = [
  { label: 'Layer 1', values: [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2} ] },
  { label: 'Layer 2', values: [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 4} ] }
];
var areaChartInstance = $('#area').epoch({
  type: 'area',
  data: data,
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
  format: function(v) {return (v*1000).toFixed(0)},
});

function emitspeed() {
  socket.emit('setspeed', $('#SpeedInput').val());
  console.log('haha');
  // $('#m').val('');
  return false;
};

function appendtable() {
  $('#datatable').append('<tr> <td> 432424 </td> <td> 1000 </td> <td> 0.5 </td> <td> 100000 </td> </tr>');
};


socket.on('dataishere', function(data) {
  console.log(data);
  gaugeChartInstance1.push(data[3]/100);
  gaugeChartInstance2.push(data[1]/100);
  // socket.emit('my other event', {
  //   my: 'data'
  // });
});
