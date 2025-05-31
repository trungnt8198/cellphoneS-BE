const express = require("express");
const analyticsController = require("@/controllers/admin/analytics.controller");

const router = express.Router();

router.get("/", analyticsController.index);

module.exports = router;
