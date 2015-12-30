var express = require('express');
var resumable = require('resumable');
var multipart = require('connect-multiparty');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(multipart());

app.post('/upload', function(req, res){
  resumable.post(req, function(status, filename, original_filename, identifier){
    res.send(status);
  });
});

var server = app.listen(3000, function () {
  console.log('server stared');
});
