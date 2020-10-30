const socketIO = require("socket.io");

module.exports = {
  init(server) {
    // socket
    this.session = [];
    const io = socketIO(server);
    io.on("connection", (socket) => {
      this.onConnetion(socket);
    });
  },
  getPendingSession() {
    return this.session.find((session) => {
      return session.playerSocket && !session.enemySocket;
    });
  },
  createPendingSession(socket) {
    const session = { playerSocket: socket, enemySocket: null };
    this.session.push(session);
  },
  startGame(session) {
    session.playerSocket.emit("gameStart", { master: true });
    session.enemySocket.emit("gameStart");
  },
  onConnetion(socket) {
    console.log(`new user connected ${socket.id}`);
    let session = this.getPendingSession();

    if (!session) {
      this.createPendingSession(socket);
    } else {
      session.enemySocket = socket;
      this.startGame(session);
    }
  },
};
