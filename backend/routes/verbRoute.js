const express = require("express");
const router = express.Router();

// controller functions

const { getAllVerbs } = require("../controllers/verbController");

// getAllVerbs route
router.get("/getAllVerbs", getAllVerbs);

module.exports = router;
