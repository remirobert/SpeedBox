var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');

io.on('connection', function (socket) {
  console.log("user connected");
  socket.emit('welcome', 'hello world');

  ss(socket).on('profile-image', function(stream, data) {
      var filename = path.basename(data.name);
      stream.pipe(fs.createWriteStream(filename));
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(3000, function () {
  console.log('server stared');
});
