var socket = require('socket.io-client')('http://127.0.0.1:3000');

socket.on('connection', function(socket) {
  socket.on('welcome', function(msg) {
    console.log('welcome msg : ', msg);
  });
});
