const socketIO = require("socket.io");

module.exports = {
  init(server) {
    // socket
    this.sessions = [];
    const io = socketIO(server);
    io.on("connection", (socket) => {
      socket.on("playerMove", (data) => {
        this.onPlayerMove(socket, data);
      });
      this.onConnetion(socket);
    });
  },
  onPlayerMove(socket, data) {
    const session = this.sessions.find(
      (session) =>
        session.playerSocket === socket || session.enemySocket === socket,
    );

    if (session) {
      let opponentSocket;

      if (session.playerSocket === socket) {
        opponentSocket = session.enemySocket;
      } else {
        opponentSocket = session.playerSocket;
      }
      opponentSocket.emit("enemyMove", data);
    }
  },
  getPendingSession() {
    return this.sessions.find((session) => {
      return session.playerSocket && !session.enemySocket;
    });
  },
  createPendingSession(socket) {
    const session = { playerSocket: socket, enemySocket: null };
    this.sessions.push(session);
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
