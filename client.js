var socket = require('socket.io-client')('http://localhost:3000');
var ss = require('socket.io-stream');
var stream = ss.createStream();
var filename = 'public_client/image.png';
var fs = require('fs');

socket.on('connect', function() {
  console.log('connection OKAY');

  socket.on('welcome', function(msg) {
    console.log('welcome msg : ', msg);
    ss(socket).emit('profile-image', stream, {name: filename});
    fs.createReadStream(filename).pipe(stream);
  });

  socket.on('disconnect', function(){
    console.log("disconnect");
  });
});
