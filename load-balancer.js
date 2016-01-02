var http = require('http'),
httpProxy = require('http-proxy');

var isReachable = require('is-reachable');
var config = require('config.json')('./server-list.json');
var servers = config.servers;
var currentServer = 0;

var getCurrentTarget = function(currentTest, callback) {
  if (currentTest == servers.length) {
    callback(null);
    return ;
  }
  var currentTarget = servers[currentServer % servers.length].host;
  isReachable(currentTarget, function (err, reachable) {
    if (err || !reachable) {
      getCurrentTarget(currentTest + 1, callback);
    }
    else {
      callback(currentTarget);
      return;
    }
  });
  currentServer++;
}

var proxy = httpProxy.createProxyServer();
var count = 0;
http.createServer(function(req,res){
    getCurrentTarget(0, function(target) {
      if (target) {
        proxy.web(req, res, {
            target: target
        });
      }
      else {
        console.error("failed to get current target. No servers available");
      }
    });
}).listen(process.env.SERVER_PORT || 8000, function() {
    console.log('load-balancer stared at port : ', process.env.SERVER_PORT || 8000);
});
