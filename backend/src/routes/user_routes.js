const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Users = require("../models/users_model");
const logger = require("../utils/logger");
const user_controller = require("../controllers/user_controller");
const controller = new user_controller();

router.use(bodyParser.urlencoded({ extended: true }));
router.post("/create", async (req, res) => {
  try {
    const user = controller.create(res, req.body);
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
  } catch (err) {
    logger.error(err);
    res.status(500).send("there whas a problem loggin in");
  }
});

module.exports = router;
