const base_controller = require("./base_controller");
const inUserCartModel = require("../models/in_user_cart_model");
const user_model = require("../models/users_model");
const bricks_model = require("../models/bricks_model");
const property_model = require("../models/property_model");
class cartController extends base_controller {
  constructor() {
    super();
    this.inUserCartModel = inUserCartModel;
    this.user_model = user_model;
  }

  get_cart(req, res) {
    try {
      const user = req.user;
      this.user_model
        .findOne({
          where: {
            id: user.id,
          },
          include: [
            {
              model: bricks_model,
              as: "bricks",
              include: [
                {
                  model: property_model,
                  as: "property",
                },
              ],
            },
          ],
        })
        .then((cart) => {
          res.status(200).send(cart);
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem in the cart controller.");
    }
  }

  add_to_cart(req, res) {
    const body = req.body;
    const user = req.user;
    try {
      this.inUserCartModel
        .create({
          user_id: user.id,
          brick_id: body.brick_id,
          quantity: body.quantity,
        })
        .then((cart) => {
          res.status(200).send(cart);
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem in the cart controller.");
    }
  }

  remove_from_cart(req, res) {
    const body = req.body;
    const user = req.user;
    try {
      this.inUserCartModel
        .destroy({
          where: {
            user_id: user.id,
            brick_id: body.brick_id,
          },
        })
        .then((cart) => {
          res.status(200).send(cart);
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem in the cart controller.");
    }
  }
}

module.exports = cartController;
