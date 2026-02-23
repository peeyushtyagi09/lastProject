const mongoose = require("mongoose");
const Event = require("../models/Event");
const Project = require("../models/Project");
const { getIO } = require("../realtime/socket.server");
const { emitEventToProject } = require("../realtime/socket.manager");

const ingestEvent = async (req, res) => {
    try {
        const { projectId } = req.params;

        // project is already validated by apiKeyAuth middleware
        const project = req.project;

        const {
            service,
            severity,
            message,
            metadata,
            environment,
            eventTimestamp
        } = req.body;

        if (!service || !severity || !message || !environment) {
            return res.status(400).json({
                message: "Missing required event fields",
            });
        }

        // Optional: eventTimestamp must be a valid ISO date string if provided
        let usedEventTimestamp = new Date();
        if (eventTimestamp) {
            const ts = new Date(eventTimestamp);
            if (isNaN(ts.getTime())) {
                return res.status(400).json({ message: "Invalid eventTimestamp" });
            }
            usedEventTimestamp = ts;
        }

        const event = await Event.create({
            projectId: project._id, // Use actual _id from fetched project for safety
            service,
            severity,
            message,
            metadata: metadata || {},
            environment,
            eventTimestamp: usedEventTimestamp,
        });

        const io = getIO();
        emitEventToProject(io, project._id.toString(), event.toObject ? event.toObject() : event); // emit plain object for socket if possible

        return res.status(201).json({
            message: "Event ingested successfully",
            eventId: event._id,
        });

    } catch (error) {
        console.error("Event ingestion error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
const getProjectEvents = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;

        const limit = Math.min(parseInt(req.query.limit) || 50, 200);
        const before = req.query.before;

        if(!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid projectId format"
            });
        }

        const project = await Project.findById(projectId);

        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (!project.ownerId || project.ownerId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to view events for this project"
            });
        }

        const query = { projectId };

        if(before){
            query.eventTimestamp = { $lt: new Date(before)};
        }

        const events = await Event.find(query)
            .sort({ eventTimestamp: -1 })
            .limit(limit)
            .lean(); 

        return res.status(200).json({
            count: events.length, 
            events
        });

    }catch (error) {
        console.error("Get project events error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    ingestEvent,
    getProjectEvents,
};