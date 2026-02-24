const RATE_LIMIT = 300;        // max events per window
const WINDOW_MS = 60 * 1000;   // 1 minute

// projectId -> { count, windowStart }
const projectCounters = new Map();

const projectRateLimiter = (req, res, next) => {
    try {
        // projectId could be in req.params or req.project (set by apiKeyAuth), fallback to req.project?._id
        let projectId = req.params && req.params.projectId;
        if (!projectId && req.project && req.project._id) {
            projectId = String(req.project._id);
        }
        if (!projectId) {
            return res.status(400).json({
                message: "Project ID missing for rate limiting"
            });
        }

        const now = Date.now();

        let entry = projectCounters.get(projectId);

        if (!entry) {
            entry = { count: 0, windowStart: now };
            projectCounters.set(projectId, entry);
        }

        // Reset window if expired
        if (now - entry.windowStart >= WINDOW_MS) {
            entry.count = 0;
            entry.windowStart = now;
        }

        entry.count += 1;

        if (entry.count > RATE_LIMIT) {
            return res.status(429).json({
                message: "Rate limit exceeded for this project. Try again later."
            });
        }

        next();

    } catch (error) {
        console.error("Project rate limiter error:", error);
        return res.status(500).json({
            message: "Rate limiter failure"
        });
    }
};

module.exports = { projectRateLimiter };