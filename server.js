var express = require('express');
var app = express();
var server = require('http').Server(app);


// var fs = require('fs');
// var bodyParser = require('body-parser')
// var busboyBodyParser = require('busboy-body-parser');
// var gfs = require('gridfs');
// var Grid = require('gridfs-stream');
// var mongoose = require('mongoose');

// var io = require('socket.io')(server);
//
// io.on('connect', function(socket) {
//   console.log("connect server socket.io");
//
//   io.on('disconnect', function(socket) {
//     console.log("disconnection server socket.io");
//   });
// });


// mongoose.connect('mongodb://localhost/test');
// var gfs = Grid(mongoose);


// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("mongoose database opened");
// });

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.use(busboyBodyParser());

// app.post('/upload', function(req, res) {
//   console.log(req.files);
//   var tempfile    = req.files.filename.path;
//   var origname    = req.files.filename.name;
//   var writestream = gfs.createWriteStream({ filename: origname });
//
//   console.log("params : ");
//   console.log(tempfile);
//   console.log(origname);
//
//   // open a stream to the temporary file created by Express...
//   fs.createReadStream(tempfile)
//   .on('end', function() {
//     res.send('OK');
//   })
//   .on('error', function() {
//     res.send('ERR');
//   })
//   // and pipe it to gfs
//   .pipe(writestream);
// });
//
// app.post('/download', function(req, res) {
//   gfs
//   // create a read stream from gfs...
//   .createReadStream({ filename: req.param('filename') })
//   // and pipe it to Express' response
//   .pipe(res);
// });

app.get('/', function(req, res) {
  var msg = "resp from server listening at port : " + (process.env.SERVER_PORT || 8000);
  res.json({
    msg: msg
  })
});

server.listen(process.env.SERVER_PORT || 8000, function () {
  console.log('server stared at port : ', process.env.SERVER_PORT || 8000);
});
