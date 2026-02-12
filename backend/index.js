const express = require("express");
const { PORT } = require("./example.env");
const cors = require("cors");
const helmet = require("helmet"); 
// const xssClean = require("xss-clean");
// const mongoSanitize = require("express-mongo-sanitize");
// const hpp = require("hpp");

const { globalLimiter } = require("./src/middleware/ratelimiter");
const { connectdb } = require("./src/Database/db");
const authRoutes = require("./src/routes/auth.Routes");
const ProjectRoutes = require("./src/routes/project.Routes");

const app = express();

// Enable CORS with specific options for credentials
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's actual origin
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'authorizarion'], // Specify allowed headers
}));

// Set secure HTTP headers
app.use(helmet());

// Prevent HTTP parameter pollution
// app.use(hpp());

// Body parser
app.use(express.json({ limit: "10kb" }));

// Prevent XSS attacks
// app.use(xssClean());

// Prevent NoSQL injections
// app.use((req, res, next) => {
//     if (req.body) {
//       mongoSanitize.sanitize(req.body);
//     }
//     next();
//   });
  
app.use(globalLimiter);

connectdb();

app.use("/api/auth", authRoutes);
app.use("/api/project", ProjectRoutes);
// 404 handler (last)
// app.use((req, res) => {
//   res.status(404).json({ message: "Resource not found" });
// });

// // Error handler (very last)
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
