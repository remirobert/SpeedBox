var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');

app.get('/', function(req, res) {
  var msg = "resp from server listening at port : " + (process.env.SERVER_PORT || 8000);
  res.json({
    msg: msg
  })
});

// io.on('connection', function (socket) {
//   console.log("user connected on server : ", arguments[0]);
//   socket.emit('welcome', 'hello world');
//
//   ss(socket).on('profile-image', function(stream, data) {
//       var filename = path.basename(data.name);
//       stream.pipe(fs.createWriteStream(filename));
//   });
//
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

server.listen(process.env.SERVER_PORT || 8000, function () {
  console.log('server stared at port : ', process.env.SERVER_PORT || 8000);
});
