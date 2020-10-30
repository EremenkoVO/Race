const PORT = 3000;
const DOCROOT = "./../dist/";

const http = require("http");
const path = require("path");
const express = require("express");

var app = express();
var server = http.createServer(app);

const documentRoot = path.join(__dirname, DOCROOT);
const staticContent = express.static(documentRoot);
app.use(staticContent);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
