const mongoose = require("mongoose");
const Event = require("../models/Event");
const Project = require("../models/Project");

const ingestEvent = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id; 

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid projectId format"
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        if (!project.ownerId || project.ownerId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to ingest events for this project",
            });
        }

        const {
            service,
            severity,
            message,
            metadata, // this can be undefined; that's okay
            environment,
            eventTimestamp
        } = req.body;

        // Basic sanity check for required fields (customize as needed)
        if (!service || !severity || !message || !environment) {
            return res.status(400).json({
                message: "Missing one or more required event fields",
            });
        }

        // check that eventTimestamp is a valid ISO date string
        // const parsedDate = new Date(eventTimestamp);
        // if (isNaN(parsedDate.getTime())) {
        //     return res.status(400).json({
        //         message: "eventTimestamp must be a valid ISO date string",
        //     });
        // }

        const event = await Event.create({
            projectId,
            service,
            severity,
            message,
            metadata: metadata || {}, // default to empty object if undefined
            environment,
            eventTimestamp,
        });

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
}

module.exports = {
    ingestEvent,
};