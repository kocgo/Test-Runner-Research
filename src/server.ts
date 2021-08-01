import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Client from "socket.io-client";
import debugModule from "debug";

const debug = new debugModule("socket-server");
const server = createServer();
const io = new Server(server);

io.on("connection", (socket) => console.log("Server ws connected"));

export default server;

// Test
if (require.main === module) {
  (async () => {
    const port = 3000;

    server.listen(port, () => {
      const clientSocket = Client(`http://localhost:${port}`);
      clientSocket.on("connect", () => console.log("Client ws connected"));
    });
  })();
}
