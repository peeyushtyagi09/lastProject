const express = require("express");
const router = express.Router();

const {validateEvent} = require("../validations/Event.validation");
const ctrl = require("../controllers/event.controller");
const {authRequired} = require("../middleware/auth");

router.post("/ingest/:projectId",authRequired, validateEvent,  ctrl.ingestEvent );
router.get("/:projectId", authRequired, ctrl.getProjectEvents);

module.exports = router;