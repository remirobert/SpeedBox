var http = require('http'),
httpProxy = require('http-proxy');
var sticky = require('sticky-session');

var isReachable = require('is-reachable');
var config = require('config.json')('./server-list.json');
var servers = config.servers;
var serverList = [];
var currentServer = 0;

var proxies = servers.map(function (target) {
  return new httpProxy.createProxyServer({
    target: target.host
  });
});

var isServerExsit = function(host) {
  console.log(serverList);
  return (serverList.filter(function(currentServer) {
    if (currentServer.ip === host) {
      return currentServer
    }
  }).length > 0) ? true : false;
}

var removeServer = function(socket) {
  serverList = serverList.filter(function(currentServer) {
    if (currentServer.socket !== socket.id) {
      return currentServer;
    }
  });
}

var getCurrentTarget = function(currentTest, callback) {
  if (currentTest == serverList.length) {
    callback(null);
    return ;
  }
  console.log("server list");
  console.log(serverList);
  console.log(serverList[currentServer % servers.length]);
  var currentTarget = serverList[currentServer % servers.length].ip;
  isReachable(currentTarget, function (err, reachable) {
    if (err || !reachable) {
      getCurrentTarget(currentTest + 1, callback);
    }
    else {
      var currentProxy = new httpProxy.createProxyServer({
        target: currentTarget
      });
      callback(currentProxy);
      //callback(proxies[currentServer]);
      return;
    }
  });
  currentServer++;
  if (currentServer >= serverList.length) {
    currentServer = 0;
  }
}

var count = 0;
var server = http.createServer(function(req, res) {
  console.log("get request");
  getCurrentTarget(0, function(currentProxy) {
    if (currentProxy) {
      currentProxy.web(req, res);
      currentProxy.on('error', function(err) {
        console.error("err proxy : ", err);
      });
    }
    else {
      console.error("failed to get current target. No servers available");
      res.writeHead(404);
      res.end();
      // res.json({
      //   status: 404,
      //   error: "No server available"
      // });
    }
  });
}).listen(process.env.SERVER_PORT || 3001, function() {
  console.log('load-balancer stared at port : ', process.env.SERVER_PORT || 3001);
});

var io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.on('connect-server', function(address) {
    if (isServerExsit(address.ip)) {
      console.error("server IP already exist");
    }
    else {
      serverList.push({
        'ip': address.ip,
        'socket': socket.id
      });
    }
  });
  socket.on('disconnect', function() {
    removeServer(socket);
  })
});
