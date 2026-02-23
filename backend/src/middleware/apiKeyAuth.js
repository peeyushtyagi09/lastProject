const mongoose = require("mongoose");
const Project = require("../model/Project");

const apiKeyAuth = async (req, res, next) => {
    try{
        const { projectId } = req.params;
        const providedKey = req.headers["x-api-key"];

        if(!providedKey) {
            return res.status(401).json({
                message: "API key missing"
            });
        }

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).json({
                message: "Invalid projectId format"
            });
        }
        const project = await Project.findById(projectId).select("+ingestKeyHash");

        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const isValid = projectId.verifyIngestKey(providedKey);

        if(!isValid){
            return res.status(403).json({
                message: "Invalid APi key"
            });
        }

        req.project = project;

        next();
    }catch(error){
        return res.status(500).json({
            message: "API Key authentication failed"
        });
    }
};

module.exports = { apiKeyAuth };