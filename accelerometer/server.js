
/* -------------------------

  Start serving files in our public folder

------------------------- */
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

/* -------------------------

  Socket.io code

------------------------- */
io.on('connection', function(socket){
  startAccelerometer(socket);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// Init board and require johnny five
var five = require("johnny-five"),
    board,
    accel;

board = new five.Board();



/* -------------------------

  Aceellorometer code

------------------------- */
function startAccelerometer(socket) {
  board.on("ready", function() {
    accel = new five.Accelerometer({
      pins: ["A1", "A2", "A3"],
      sensitivity: 26, // mV/degree/seconds
      zeroV: 478 // volts in ADC
    });

    // Accelerometer Event API
    accel.on("data", function(data) {
      socket.emit('moving', data);
      console.log("raw: ", data.x);
    });
  });
}
