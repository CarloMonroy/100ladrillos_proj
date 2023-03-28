const logger = require("../utils/logger");
const base_controller = require("./base_controller");
const property_model = require("../models/property_model");
const bricks_model = require("../models/bricks_model");

class bricksController extends base_controller {
  constructor() {
    super();
    this.bricks_model = bricks_model;
    this.property_model = property_model;
  }

  get_all(req, res) {
    const body = req.body;
    const user = req.user;
    try {
      // get all bricks and paginate wih findAndCountAll
      this.bricks_model
        .findAndCountAll({
          limit: parseInt(req.body.limit),
          offset: parseInt(req.body.offset),
          include: [
            {
              model: this.property_model,
            },
          ],
        })
        .then((bricks) => {
          res.status(200).send(bricks);
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem finding the bricks.");
    }
  }
}

module.exports = bricksController;
