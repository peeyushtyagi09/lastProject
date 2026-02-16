const http = require("http");
const app = require("./app");
const { connectdb } = require("./src/Database/db");
const { initializeSocketServer } = require("./src/realtime/socket.server");
const { PORT } = require("./example.env");

async function startServer() {
    try{
        await connectdb();

        const server = http.createServer(app);

        initializeSocketServer(server);

        server.listen(PORT, () => {
            console.log(`Sever running on PORT ${PORT}`);
        });
    }catch(error){
        console.error("Server startup failed: ", error);
        process.exit(1);
    }
}

startServer();