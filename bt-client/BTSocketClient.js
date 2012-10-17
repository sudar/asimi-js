var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000');

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
});

socket.on('left', function () {
    console.log("left");
});

socket.on('right', function () {
    console.log("right");
});

socket.on('down', function () {
    console.log("down");
});

socket.on('disconnect', function () {
  // socket disconnected
});
