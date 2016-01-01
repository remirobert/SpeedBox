var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connection', function (socket) {
  console.log("user connected");
  socket.emit('welcome', 'hello world');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(3000, function () {
  console.log('server stared');
});
