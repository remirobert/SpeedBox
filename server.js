var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//app.use(siofu.router);

server.listen(3000, function () {
  console.log('server stared');
});


io.on('connection', function (socket) {
  socket.emit('welcome', 'hello world');
});

// io.on('connection', function(socket) {
//   var uploader = new siofu();
//   uploader.dir = "/public";
//   uploader.listen(socket);
//
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
