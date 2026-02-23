const Project = require("../models/Project");

exports.createProject = async(req, res) => {
    try{
        const { projectName, description } = req.body;
        const ownerId = req.user.id; 

        const existsProject = await Project.findOne ({
            projectName, 
            ownerId,
        });

        if(existsProject) {
            return res.status(409).json({
                message: "Project with this name already exists"
            });
        }

        const project = await Project.create({
            projectName,
            description, 
            ownerId, 
        });

        const apiKey = project.generateIngestKey();
        await project.save();

        return res.status(200).json({
            message: "Project Created SuccessFully", 
            project: {
                _id: project._id, 
                prohectName: project.projectName, 
                description: project.description, 
                createAt: project.createAt,
            }, 
            ingestKey: apiKey, 
            note: "Store this Api key securely.It will not be shown again."
        });
    }catch(error) {
        return res.status(500).json({
            message: "Failed to create Project", 
            error: error.message
        })
    }
};

exports.listProject = async (req, res) => {
    try {
        const ownerId = req.user.id; 
        const Projects = await Project.find({ ownerId }).sort({ createdAt : -1});
        return res.status(200).json({
            Projects,
        });;
    }catch(error) {
        res.status(500).json({
            message: "failed to fetch Project",
            error: error.message
        })
    }
};
