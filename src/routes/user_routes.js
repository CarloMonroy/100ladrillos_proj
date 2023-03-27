const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Users = require("../models/users_model");
const logger = require("../utils/logger");

router.use(bodyParser.urlencoded({ extended: true }));
const controller = require("../controllers/user_controller");

router.post("/create", async (req, res) => {
  try {
    const user = await controller.create(res, req.body);
    res.status(200).send(user);
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .send("There was a problem adding the information to the database.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await controller.login(res, req.body);
    res.status(200).send(user);
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .send("There was a problem adding the information to the database.");
  }
});

module.exports = router;
