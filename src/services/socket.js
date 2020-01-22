import socketio from "socket.io-client";

const socket = socketio("http://192.168.100.108:3333", {
  autoConnect: false
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on("new-dev", subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  console.log("Conectaaaa");
  socket.connect();

  socket.on("connect", () => {
    console.log("CONECTOOUUUw");
    console.log(socket.id);
  });

  socket.on("message", text => {
    console.log("chegou notificação");
    console.log(text);
  });
}

function disconnect() {
  console.log("Disconectaaa");
  if (socket.connected) {
    socket.disconnect();
    console.log("Disconectoouuuuuw");
  }
}

export { connect, disconnect, subscribeToNewDevs };
