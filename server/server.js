const PORT = process.env.PORT || 3000;
const STATIC_ON = process.env.STATIC || true;
const DOCROOT = "./../dist/";

// Dependencies
const http = require("http");
const path = require("path");
const express = require("express");
const sockets = require("./sockets");

// init app
var app = express();
var server = http.createServer(app);

// static files
if (STATIC_ON) {
  const documentRoot = path.join(__dirname, DOCROOT);
  const staticContent = express.static(documentRoot);
  app.use(staticContent);
}

// init sockets
sockets.init(server);

// create server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
  });
});
