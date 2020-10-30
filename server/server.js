const PORT = 3000;
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
const documentRoot = path.join(__dirname, DOCROOT);
const staticContent = express.static(documentRoot);
app.use(staticContent);

// init sockets
sockets.init(server);

// create server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
