var express = require('express');
var resumable = require('resumable');
var multipart = require('connect-multiparty');
var app = express();

var server = app.listen(3000, function () {
  console.log('server stared');
});
