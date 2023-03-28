const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const logger = require("../utils/logger");
const bricks_controller = require("../controllers/bricks_controller");

const controller = new bricks_controller();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/all_bricks", controller.authenticateToken, async (req, res) => {
  try {
    const bricks = controller.get_all(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem finding the bricks.");
  }
});

module.exports = router;
