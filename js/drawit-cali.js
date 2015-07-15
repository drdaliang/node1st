var socket = io('http://localhost:8000');
var SN;

//float data names
var floatDataNames = {
  "motorPIDEnableFlag" : 0,
"fanPIDEnableFlag" : 1,
"relay1Status" : 2,
"relay2Status" : 3,
"relay3Status" : 4,
"motorSpeed" : 0,
"motorSpeedSet" : 1,
"motorPWM" : 2,
"motorPIDp" : 3,
"motorPIDi" : 4,
"fanSpeed" : 5,
"fanSpeedSet" : 6,
"fanPWM" : 7,
"fanPIDp" : 8,
"fanPIDi" : 9,
"tcTempWall" : 10,
"tcTempExhaust" : 11,
"ambientTemp1" : 12,
"ambientTemp2" : 13,
"fueltankWeight" : 14,
"fueltankFS" : 15,
"fueltankZero" : 16,
"armForce" : 17,
"armZero" : 18,
"armFS" : 19,
"resistorPosition" : 20,
"resistorZero" : 21,
"resistorFS" : 22,
};

//boolean data names
var booleanDataNames = {
  "motorPIDEnableFlag" : 0,
  "fanPIDEnableFlag" : 1,
  "relay1Status" : 2,
  "relay2Status" : 3,
  "relay3Status" : 4,
};

//int data names
var intDataNames = {
  "ambientRH" : 0,
"ambientP" : 1,
"throttlePosition" : 2,
"throttleZero" : 3,
"throttleFS" : 4,
"serialNumber" : 5,
};

var eventFlagsNames = {
  'setBoolean':0,
'setFloat':1,
'setInt':2,
'setMotorSpeed':3,
'setMotorPWM':4,
'startMotor':5,
'stopMotor':6,
'inverseMotorDR':7,
'runOneRev':8,
'startFan':9,
'stopFan':10,
'setFanPWM':11,
'setFanSpeed':12,
'feedInThrottle':13,
'feedOutThrottle':14,
'setThrottleZero':15,
'setThrottleFS':16,
'feedInResistor':17,
'feedOutResistor':18,
'setResistorZero':19,
'setResistorFS':20,
'burnGLowplug':21,
'switch2ModeA':22,
'switch2ModeB':23,
};

var floatCMDNames = {
  "motorSpeedSet":0,
"motorPWM":1,
"motorPIDp":2,
"motorPIDi":3,
"fanSpeedSet":4,
"fanPWM":5,
"fanPIDp":6,
"fanPIDi":7,
"fueltankFS":8,
"fueltankZero":9,
"armZero":10,
"armFS":11,
"resistorZero":12,
"resistorFS":13,
};
var booleanCMDNames = {
  "motorPIDEnableFlag":0,
"fanPIDEnableFlag":1,
"relay1Status":2,
"relay2Status":3,
"relay3Status":4,
};
var intCMDNames = {
  "throttleZero":0,
"throttleFS":1,
};

var floatdata;
var intdata;
var booleandata;

var floatCMD;
var intCMD;
var booleanCMD;

var eventFlags = Array(false,false,false,false,false,
false,false,false,false,false,
false,false,false,false,false,
false,false,false,false,false,
false,false,false,false);


var options = {
  valueNames: ['Namee', 'Valuee']
};

var motordata=[];
var motorList = new List('motorTable', options);
var fandata=[];
var fanList = new List('fanTable', options);
var throttledata=[];
var throttleList = new List('throttleTable', options);
function emitspeed() {
  socket.emit('setspeed', JSON.stringify({
    motorSpeedSet: Math.round(Number($('#SpeedInput').val()))
  }));
  console.log('haha');
  // $('#m').val('');
  return false;
};

function updateUI() {
  motorData = [
  {Namee: 'motorPIDEnableFlag', Valuee: booleandata[booleanDataNames['motorPIDEnableFlag']]},
  {Namee: 'motorSpeed', Valuee: floatdata[floatDataNames['motorSpeed']]},
  {Namee: 'motorSpeedSet', Valuee: floatdata[floatDataNames['motorSpeedSet']]},
  {Namee: 'motorPWM', Valuee: floatdata[floatDataNames['motorPWM']]},
  {Namee: 'motorPIDp', Valuee: floatdata[floatDataNames['motorPIDp']]},
  {Namee: 'motorPIDi', Valuee: floatdata[floatDataNames['motorPIDi']]},
  ];
motorList.clear();
motorList.add(motorData);

fanData = [
  {Namee: 'fanSpeed', Valuee: floatdata[floatDataNames['fanSpeed']]},
  {Namee: 'fanSpeedSet', Valuee: floatdata[floatDataNames['fanSpeedSet']]},
  {Namee: 'fanPWM', Valuee: floatdata[floatDataNames['fanPWM']]},
  {Namee: 'fanPIDp', Valuee: floatdata[floatDataNames['fanPIDp']]},
  {Namee: 'fanPIDi', Valuee: floatdata[floatDataNames['fanPIDi']]},
  {Namee: 'fanPIDEnableFlag', Valuee: booleandata[booleanDataNames['fanPIDEnableFlag']]},
];
fanList.clear();
fanList.add(fanData);


throttleData = [
  {Namee: 'throttlePosition', Valuee: intdata[intDataNames['throttlePosition']]},
  {Namee: 'throttleZero', Valuee: intdata[intDataNames['throttleZero']]},
  {Namee: 'throttleFS', Valuee: intdata[intDataNames['throttleFS']]},
];
throttleList.clear();
throttleList.add(throttleData);
};
function emitEvent(event){
try {
  eventFlags[eventFlagsNames[event]]=true;
  socket.emit('eventishere',JSON.stringify({"eventCMD":eventFlags}));
  eventFlags[eventFlagsNames[event]]=false;
} catch (e) {
console.log(e)
}
}

function objsize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function fetchintCMD(){
  var intCMDArray = new Array(objsize(intCMDNames));
  for (var i in intCMDNames){
    intCMDArray[intCMDNames[i]] = intdata[intDataNames[i]];
  }
  return intCMDArray
};

function emitintCMD(event){
try {
  intCMD=fetchintCMD();
  intCMD[intCMDNames[event]]=Math.round(($('#'+event+'Input').val()));
  socket.emit('eventishere',JSON.stringify({"intCMD":intCMD}));
} catch (e) {
console.log(e)
}
}

function fetchfloatCMD(){
  var floatCMDArray = new Array(objsize(floatCMDNames));
  for (var i in floatCMDNames){
    floatCMDArray[floatCMDNames[i]] = floatdata[floatDataNames[i]];
  }
  return floatCMDArray
};

function emitfloatCMD(event){
try {
  floatCMD=fetchfloatCMD();
  floatCMD[floatCMDNames[event]]=Number($('#'+event+'Input').val())+0.01;
  socket.emit('eventishere',JSON.stringify({"floatCMD":floatCMD}));
  console.log(JSON.stringify({"floatCMD":floatCMD}));
} catch (e) {
console.log(e)
}
}

function fetchbooleanCMD(){
  var booleanCMDArray = new Array(objsize(booleanCMDNames));
  for (var i in booleanCMDNames){
    booleanCMDArray[booleanCMDNames[i]] = booleandata[booleanDataNames[i]];
  }
  return booleanCMDArray
};

function emitbooleanCMD(event){
try {
  booleanCMD=fetchbooleanCMD();
  booleanCMD[booleanCMDNames[event]]=Boolean($('#'+event+'Input').val());
  socket.emit('eventishere',JSON.stringify({"booleanCMD":booleanCMD}));
  console.log(JSON.stringify({"booleanCMD":booleanCMD}));
} catch (e) {
console.log(e)
}
}

socket.on('dataishere', function(data) {

//Process message to javascript array
  floatdata = data["floatdata"];
  console.log(floatdata)
  booleandata = data["booleandata"];
  intdata = data["intdata"];
  SN = data["SN"];
  updateUI();
//  console.log(motorData);
  // socket.emit('my other event', {
  //   my: 'data'
  // });
});
