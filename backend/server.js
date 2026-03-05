const http = require("http");
const net = require("net");
const app = require("./app");
const { connectdb } = require("./src/Database/db");
const { initializeSocketServer, getIO } = require("./src/realtime/socket.server");
const { PORT } = require("./example.env");

let socketServerInitialized = false;

async function startServer() {
    try {
        await connectdb();

        // Temporary SMTP quick test
        const socket = net.createConnection(587, "smtp.gmail.com");

        socket.on("connect", () => {
            console.log("SMTP reachable");
            socket.end();
        });

        socket.on("error", err => {
            console.error("SMTP connection error:", err.message);
        });
        // End SMTP quick test

        const server = http.createServer(app);

        const io = initializeSocketServer(server);
        socketServerInitialized = !!io;

        if (socketServerInitialized) {
            console.log("Socket server initialized successfully.");
        } else {
            console.warn("Socket server failed to initialize.");
        }

        server.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed: ", error);
        process.exit(1);
    }
}

startServer();

module.exports = { socketServerInitialized };