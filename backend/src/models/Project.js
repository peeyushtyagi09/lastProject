// Unique project ID

// Project name

// Optional description

// Owner user ID

// Created timestamp
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
        projectName:{
            type: String, 
            required: true,
            trim: true,
            minlength: 3, 
            maxlength: 200,
        },
        description: {
            type: String,  
            trim: true, 
            maxlength: 500,
            default: "",
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true, 
            index: true,
        }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Project", ProjectSchema);