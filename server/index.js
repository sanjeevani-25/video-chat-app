const { Server } = require("socket.io");

const io = new Server(8000, { cors: true });

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// console.log(io);
io.on("connection", (socket) => {
  socket.on("room:join", (data) => {
    // console.log(data)
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(socket.id).emit("room:join", data);
  });
  console.log("Socket Connected", socket.id);
});
