var request = require('request');
var fs = require('fs');
var commander = require('commander');

commander.version('0.0.1')
  .option('-d, --downlod', 'Download a file')
  .option('-u, --upload', 'Upload a file')
  .parse(process.argv);

var uploadFile = function(file) {
  var r = request.post('http://service.com/upload', function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('Upload failed:', err);
    }
    console.log('Upload successful!');
  })
  var form = r.form();
  var streamUpload = fs.createReadStream(__dirname + '/' + file);
  form.append('filename', streamUpload, {filename: 'unicycle.jpg'});
}

var downloadFile = function(file) {
  var stream = fs.createWriteStream(file);
  request.get('http://127.0.0.1:3001/download?filename=' + file, function(err, httpResponse, body) {
      if (err) {
        return console.error('Download failed:', err);
      }
      console.log('Download successful!');
  }).pipe(stream);
}

if (!commander.upload && !commander.download && commander.args.length == 0) {
  console.error("Invalid arguments");
  process.exit(1);
}
else {
  var file = commander.args[0];
  if (commander.upload) {
    uploadFile(file)
  }
  else if (commander.download) {
    downloadFile(file);
  }
}
