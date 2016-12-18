'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`WEBSOCKET Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);

var httpServer = express();
var httpPort = 0;

httpServer.use(bodyParser.json());
httpServer.use(bodyParser.urlencoded({ extended: true }));

httpServer.post('/', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

httpPort = 80;
httpServer.listen(port);
console.log('HTTP Listening at ' + port)
