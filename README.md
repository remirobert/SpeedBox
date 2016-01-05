#SpeedBox

[![License](https://img.shields.io/node/v/gh-badges.svg)](http://nodejs.org)
![License](https://img.shields.io/packagist/l/doctrine/orm.svg)
![express](https://img.shields.io/badge/express-yes-orange.svg)

[<img align="left" src="logo.png" hspace="20">](#logo) SpeedBox is a Node.js server.


It allows you to download and upload files.
The servers are clustering, and managed by a load-balancer.

#How to run it

First, we use *pm2* to manage the cluster servers.
In addition of that, all the server, and also the load-balancer needs to be initiated in the *pm2.json* file.

```json
{
  "apps": [
    {
      "exec_mode": "fork_mode",
      "script": "./server.js",
      "name": "server-1",
      "env": {
        "SERVER_PORT": 8001
      },
      "error_file": "./logs/server-1.err.log",
      "out_file": "./logs/server-1.out.log"
    },
    {
      "script": "./load-balancer.js",
      "name": "load-balancer",
      "env": {
        "SERVER_PORT": 3000
      },
      "error_file": "./logs/load-balancer.err.log",
      "out_file": "./logs/load-balancer.out.log"
    }
}
```

Here you need to specifie the *SERVER_PORT* property, if not a default port will be allowed, and some conflit can happend.
you can add as many server as you want. *pm2* will manager all the process.

To run the servers:
```bash
pm2 start pm2.json
```

To stop the servers: 
```bash
pm2 stop all
```

For more informations about *pm2*, please look at the offcial documentation.
