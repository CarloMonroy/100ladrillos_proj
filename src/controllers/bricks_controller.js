const logger = require("../utils/logger");

const bricks_model = require("../models/bricks_model");

class bricksController {
  constructor() {
    this.bricks_model = bricks_model;
  }

  get_all(res) {
    try {
      this.bricks_model.findAll().then((bricks) => {
        res.status(200).send(bricks);
      });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem finding the bricks.");
    }
  }
}

module.exports = bricksController;
