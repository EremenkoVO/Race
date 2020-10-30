const PORT = 3000;
const DOCROOT = "./../dist/";

// Dependencies
const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");

// init app
var app = express();
var server = http.createServer(app);

// static files
const documentRoot = path.join(__dirname, DOCROOT);
const staticContent = express.static(documentRoot);
app.use(staticContent);

// create server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// socket
const io = socketIO(server);
io.on("connection", (socket) => {
  socket.emit("gameStart");
  console.log(`new user connected ${socket.id}`);
});
