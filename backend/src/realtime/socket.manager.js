const mongoose = require("mongoose");
const Project = require("../models/Project");

async function registerSocketHandlers(io, socket) {
    socket.on("subscribe", async ({ projectId }) => {
        try{
            if(!projectId) {
                return socket.emit("subscription-error", "Project ID is required");
            }

            if(!mongoose.Types.ObjectId.isValid(projectId)) {
                return socket.emit("subscription-error", "Invalid project Id format");
            }

            const project = await Project.findById(projectId).select("ownerId");

            if(!project) {
                return socket.emit("subscription-error", "Project not found");
            }

            if(project.ownerId.toString() !== socket.userId.toString()){
                console.warn(
                    `Unauthorized subscription attempt. User: ${socket.userId}, Project: ${projectId}`
                );
                return socket.emit("subscription-error", "Unauthorized access to this project");
            }

            const roomName = `project:${projectId}`;

            socket.join(roomName);

            socket.emit("subscription-success", {
                projectId, 
                message: "Subscribed successfully"
            });

            console.log(`User ${socket.userId} joined ${roomName}`);
        }catch(error){
            console.error("Subscription error:", error);
            socket.emit("subscription-error", "Subscription failed");
        }
    });
    socket.on("unsubscribe", ({ projectId }) => {
        if (!projectId) return;

        const roomName = `project:${projectId}`;
        socket.leave(roomName);

        console.log(`User ${socket.userId} left ${roomName}`);
    });
}


function emitEventToProject(io, projectId, eventData) {
    const roomName = `project:${projectId}`;
    io.to(roomName).emit("new-event", eventData);
}

module.exports = {
    registerSocketHandlers,
    emitEventToProject
};