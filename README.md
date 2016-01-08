#SpeedBox

[![License](https://img.shields.io/node/v/gh-badges.svg)](http://nodejs.org)
![License](https://img.shields.io/packagist/l/doctrine/orm.svg)
![express](https://img.shields.io/badge/express-yes-orange.svg)

[<img align="left" src="logo.png" hspace="20">](#logo) **SpeedBox** is a **Node.js** server.


It allows you to download and upload files.<br/>
The servers are clustering, and managed by a load-balancer.

<br/>
<br/>

```
                     +-------------------+
                     |                   |
                     | client, upload,   |
                     |  download         |
                     |                   |
                     +--------+----------+
                              |
                              |
                              |
                              |
               +--------------v---------------+
               |                              |
               |                              |
               |      load-balancer:3000      |
               |                              |
               |                              |
       +-------+-------------+----------------+-----+
       |                     |                      |
       |                     |                      |
       |                     |                      |
       |                     |                      |
+------v---------+   +-------v----------+  +--------v--------+
|                |   |                  |  |                 |
|                |   |                  |  |                 |
|  server1:8001  |   |   server2:8002   |  |  server3:8003   |
|                |   |                  |  |                 |
|                |   |                  |  |                 |
+------+---------+   +-------+----------+  +--------+--------+
       |                     |                      |
       |                     |                      |
       |                     |                      |
       |      +--------------v----------------+     |
       |      |                               |     |
       |      |                               |     |
       |      |     database (mongodb)        |     |
       +-----^+     stores all the files      <-----+
              |                               |
              |                               |
              |                               |
              +-------------------------------+
```

<br/>

#Requirements

  - pm2
  - node.js
  - mongodb

#Package
The *package.json* file contains all the packages used in this project.
This is the main list and their usage.

  - **express**, to manage the http server
  - **mongodb**, to manage the connection with the *mongodb* database
  - **gridfs-stream**, to manage the data stream in the *mongodb*, write and read. And split data in chunck, to pass the limitation of 16Mo, allowed to mongodb per document
  - **is-reachable**, to try the reachability to an host. Used to check if a server is available or not
  - **config.json**, to read configuration files, in *json format*, used to specify the server list to the load-balancer
  - **http-proxy**, to manage the proxy in the load-balancer, and transfert request, to an another server
  - **multer**, to get easily the params from a *form request*

#How to run it

First, we use **pm2** to manage the cluster servers.
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
  ]
}
```

Here you need to specifie the **SERVER_PORT** property, if not a default port will be allowed, and some conflit can happend.
you can add as many server as you want. **pm2** will manager all the process.

To run the servers:
```bash
pm2 start pm2.json
```

To stop the servers: 
```bash
pm2 stop all
```

For more informations about **pm2**, please look at the offcial documentation.
