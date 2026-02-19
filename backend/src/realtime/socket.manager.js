function registerSocketHandlers(io, socket){
    socket.on("subscribe", ({ projectId }) => {
        if(!projectId) {
            return socket.emit("error", "Project Id is required");
        }

        const roomName = `project:${projectId}`;

        socket.join(roomName);
        console.log(`User ${socket.userId} joined ${roomName}`);
    });

    socket.on("unsubscribe", ({ projectId }) => {
        if(!projectId) return;
        const roomName = `Project:${projectId}`;
        socket.leave(roomName);
        console.log(`User ${socket.userId} left ${roomName}`);
    })
}

function emitEventToProject(io, projectId, eventData) {
    const roomName = `project:${projectId}`;
    io.to(roomName).emit("new-event", eventData);
}

module.exports = {
    registerSocketHandlers, 
    emitEventToProject
}