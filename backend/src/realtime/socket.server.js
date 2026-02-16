const { Server } = require("socket.io");
const { verifySocketToken } = require("./socket.auth");
const { registerSocketHandlers } = require("./socket.manager");

let io = null;

// create a WebSocket server

function initializeSocketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
        }
    });

    // Middleware for authenticating socket connection
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth?.token;

            if (!token) {
                return next(new Error("Authentication token missing"));
            }

            const user = await verifySocketToken(token);

            socket.userId = user.id;
            next();
        } catch (error) {
            next(new Error("Authentication failed"));
        }
    });

    // handle new connections
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}, User: ${socket.userId}`);

        registerSocketHandlers(io, socket);

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}

module.exports = {
    initializeSocketServer,
    getIO
};
