var http = require('http'),
httpProxy = require('http-proxy');

var config = require('config.json')('./server-list.json');
var servers = config.servers;
var currentServer = 1;

var loadBalanceProxy = function(req, res) {
    var target = servers[currentServer % servers.length].host;
    proxy.web(req, res, {
        target: target
    });
    currentServer++;
}

var proxy = httpProxy.createProxyServer();
var count = 0;
http.createServer(function(req,res){
    loadBalanceProxy(req,res);
}).listen(process.env.SERVER_PORT || 8000, function() {
    console.log('load-balancer stared at port : ', process.env.SERVER_PORT || 8000);
});
