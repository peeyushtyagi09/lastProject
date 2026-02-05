const express = require("express");
const { PORT } = require("./example.env");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const app = express();

// Enable CORS with specific options (customize as needed)
app.use(cors());

// Set secure HTTP headers
app.use(helmet());

// Prevent HTTP parameter pollution
app.use(hpp());

// Body parser
app.use(express.json({ limit: "10kb" }));

// Prevent XSS attacks
app.use(xssClean());

// Prevent NoSQL injections
app.use(mongoSanitize());

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use(limiter);

// Simple route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
    // Basic error handler
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
