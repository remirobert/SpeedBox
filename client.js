var port = process.env.SERVER_PORT || 8000;
var socket = require('socket.io-client')('http://127.0.0.1:3000');

var filename = 'public_client/image.png';

socket.on('connect', function() {
  console.log('coneccted to server');
});

socket.on('connection', function() {
  console.log('coneccted to server');
});
