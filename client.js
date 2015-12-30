var Resumable = require('resumable');

var r = new Resumable({
  target:'/upload',
  chunkSize:1*1024*1024,
  simultaneousUploads:4,
  throttleProgressCallbacks:1,
  resumableRelativePath:'/Users/remirobert/Documents/node/SpeedBox/public_client/image.png'
});

if(!r.support) {
  console.log("Resumable not availbaible");
}
else {
  r.upload();
}
