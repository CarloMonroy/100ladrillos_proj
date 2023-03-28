const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const logger = require("../utils/logger");

const property_controller = require("../controllers/property_controller");

const controller = new property_controller();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/all", controller.authenticateToken, async (req, res) => {
  try {
    const property = controller.get_all(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem finding the property.");
  }
});

router.post("/create", controller.authenticateToken, async (req, res) => {
  try {
    const bricks = await controller.create_property(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem creating the property.");
  }
});

module.exports = router;
