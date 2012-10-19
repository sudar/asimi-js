/**
 * Asimi JS - An express.js based webapp that allows you to control Arduino based robots from anywhere
 *
 * http://hardwarefun.com/projects/asimijs
 *
 * Author: Sudar
 */

var io = require('socket.io-client'),
    SerialPort = require("serialport").SerialPort,
    bt = new SerialPort("/dev/cu.FireFly-CCFA-SPP"),     // bluetooth serial port
    socket = io.connect('http://hardwarefun.com:3000'),  // server url
    DIRECTIONS = {UP: 1, LEFT: 2, RIGHT: 3, DOWN: 4, START: 5};

// when data is received from bluetooth
bt.on("data", function (data) {
    console.log("Got: " + data);
});

// error reading bluetooth serial port
bt.on("error", function (data) {
    console.log("Error: " + data);
});

// Connected
socket.on('connect', function () {
    socket.emit('clientjoin', { }, function (result) {
        // TODO: Check error status
        console.log("Joined");
    });
});

// controls
socket.on('up', function () {
    console.log("Up");
    bt.write(new Buffer([DIRECTIONS.UP]));
});

socket.on('left', function () {
    console.log("left");
    bt.write(new Buffer([DIRECTIONS.LEFT]));
});

socket.on('right', function () {
    console.log("right");
    bt.write(new Buffer([DIRECTIONS.RIGHT]));
});

socket.on('down', function () {
    console.log("down");
    bt.write(new Buffer([DIRECTIONS.DOWN]));
});

socket.on('start', function () {
    console.log("start");
    bt.write(new Buffer([DIRECTIONS.START]));
});

socket.on('disconnect', function () {
    console.log("Disconnected");
});
