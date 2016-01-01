var socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function() {
  console.log('connection OKAY');
  socket.on('welcome', function(msg) {
    console.log('welcome msg : ', msg);
  });
  socket.on('disconnect', function(){
    console.log("disconnect");
  });
});
