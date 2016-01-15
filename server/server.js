var express = require('express');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var bodyParser = require('busboy-body-parser');

var socket = require('socket.io-client')("http://127.0.0.1:3001");

app.use(bodyParser());

var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var db = new mongo.Db('yourDatabaseName', new mongo.Server("127.0.0.1", 27017));

var gfs;

socket.on('connect', function() {
  console.log("connected to load-balancer");
  var ipAddress = "http://127.0.0.1:" + (process.env.SERVER_PORT || 8000);
  socket.emit('connect-server', {ip: ipAddress});
});

db.open(function (err) {
  if (err) {
    console.log("error open database : ", err);
  }
  else {
    console.log("success open database");
    gfs = Grid(db, mongo);
  }
});

app.post('/upload', function(req, res) {
  var dirname = require('path').dirname(__dirname);
  var part = req.files.filename;

  var writeStream = gfs.createWriteStream({
    filename: part.name,
    mode: 'w',
    content_type:part.mimetype
  });
  writeStream.on('close', function() {
    return res.status(200).send({
      message: 'Success'
    });
  });
  writeStream.on('error', function(err) {
    return res.status(400).send({
      message: err
    });
  });
  writeStream.write(part.data);
  writeStream.end();
});

app.get('/download', function(req, res) {
  gfs.files.find({ filename: req.query.filename }).toArray(function (err, files) {
    if(files.length === 0){
      return res.status(400).send({
        message: 'File not found'
      });
    }

    res.writeHead(200, {'Content-Type': files[0].contentType});

    var readstream = gfs.createReadStream({
      filename: files[0].filename
    });

    readstream.on('data', function(data) {
      res.write(data);
    });

    readstream.on('end', function() {
      res.end();
    });

    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });
});

app.get('/', function(req, res) {
  var msg = "resp from server listening at port : " + (process.env.SERVER_PORT || 8000);
  res.json({
    msg: msg
  })
});

app.get('/files', function(req, res) {
  gfs.files.find({}).toArray(function (err, files) {
    if (err) {
      return res.status(401).send({
        message: "No files found"
      });
    }
    var fileNames = files.map(function(currentFile) {
      return currentFile.filename
    })
    return res.status(200).send({
      files: fileNames
    });
    });
});

server.listen(process.env.SERVER_PORT || 8000, function () {
  console.log('server stared at port : ', process.env.SERVER_PORT || 8000);
});
