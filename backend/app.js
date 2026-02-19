const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// const { globalLimiter } = require("./src/middleware/ratelimiter");

const authRoutes = require("./src/routes/auth.Routes");
const projectRoutes = require("./src/routes/project.Routes");
const eventRoutes = require("./src/routes/event.Routes");

const app = express();

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

// app.use(globalLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/events", eventRoutes);

module.exports = app;