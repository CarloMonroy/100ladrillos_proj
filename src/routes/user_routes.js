const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Users = require("../models/users_model");
const logger = require("../utils/logger");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/create", async (req, res) => {
  try {
    const user = await Users.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;
