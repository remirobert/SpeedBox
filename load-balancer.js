var http = require('http'),
httpProxy = require('http-proxy');
var sticky = require('sticky-session');

var isReachable = require('is-reachable');
var config = require('config.json')('./server-list.json');
var servers = config.servers;
var currentServer = 0;

var proxies = servers.map(function (target) {
  return new httpProxy.createProxyServer({
    target: target.host
  });
});

var getCurrentTarget = function(currentTest, callback) {
  if (currentTest == proxies.length || currentTest == servers.length) {
    callback(null);
    return ;
  }
  var currentTarget = servers[currentServer % servers.length].host;
  isReachable(currentTarget, function (err, reachable) {
    if (err || !reachable) {
      getCurrentTarget(currentTest + 1, callback);
    }
    else {
      callback(proxies[currentServer]);
      return;
    }
  });
  currentServer++;
  if (currentServer >= servers.length) {
    currentServer = 0;
  }
}

var count = 0;
var server = http.createServer(function(req,res) {
  getCurrentTarget(0, function(currentProxy) {
    if (currentProxy) {
      currentProxy.web(req, res);
      currentProxy.on('error', function(err) {
        console.error("err proxy : ", err);
      });
    }
    else {
      console.error("failed to get current target. No servers available");
    }
  });
}).listen(process.env.SERVER_PORT || 3001, function() {
  console.log('load-balancer stared at port : ', process.env.SERVER_PORT || 3001);
});
