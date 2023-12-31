const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 7000;
http.listen(PORT, () => console.log("Server running on port", PORT));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket implementation

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected ...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
