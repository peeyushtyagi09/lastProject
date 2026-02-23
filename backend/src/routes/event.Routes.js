const express = require("express");
const router = express.Router();

const {validateEvent} = require("../validations/Event.validation");
const ctrl = require("../controllers/event.controller");
const {authRequired} = require("../middleware/auth");
const { apiKeyAuth } = require("../middleware/apiKeyAuth");

router.post("/ingest/:projectId", apiKeyAuth, validateEvent,  ctrl.ingestEvent );
router.get("/:projectId", authRequired, ctrl.getProjectEvents);

module.exports = router;