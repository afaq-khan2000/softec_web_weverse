const socketIo = require('socket.io');
const { decodeToken } = require('./token');

let io;

const socketInit = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    const { token } = socket.handshake.query;

    const decoded = decodeToken(token);

    if (decoded?.id) {
      socket.join(decoded?.id);
      console.log('Client joined room: ', decoded?.id);
    }

    socket.on('disconnect', () => {
      console.log('Client disconnected', decoded?.id);
    });
  });

  console.log('Socket initialized');
};

module.exports = {
  socketInit,
  io,
};
