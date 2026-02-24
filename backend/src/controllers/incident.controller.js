const Incident = require("../models/Incident");
const Project = require("../models/Project");

exports.getProjectIncidents = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await Project.findById(projectId);

    if (!project || project.ownerId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const incidents = await Incident.find({ projectId })
      .sort({ lastOccurredAt: -1 })
      .lean();

    return res.status(200).json({ incidents });

  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch incidents" });
  }
};

exports.updateIncidentStatus = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!["ACKNOWLEDGED", "RESOLVED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const incident = await Incident.findById(incidentId).populate("projectId");

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    if (incident.projectId.ownerId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    incident.status = status;
    await incident.save();

    return res.status(200).json({
      message: "Incident updated successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: "Failed to update incident" });
  }
};