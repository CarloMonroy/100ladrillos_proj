const base_controller = require("./base_controller");
const property_model = require("../models/property_model");
const bricks_model = require("../models/bricks_model");

class propertyController extends base_controller {
  constructor() {
    super();
    this.property_model = property_model;
    this.bricks_model = bricks_model;
  }

  // get_all(req, res) {
  //   try {
  //     this.property_model.findAll().then((property) => {
  //       res.status(200).send(property);
  //     });
  //   } catch (err) {
  //     logger.error(err);
  //     res.status(500).send("There was a problem finding the property.");
  //   }
  // }

  get_all(req, res) {
    try {
      logger.info(req.params);
      this.property_model
        .findAndCountAll({
          limit: 10,
          offset: 0,
          include: [
            {
              model: this.bricks_model,
            },
          ],
        })
        .then((property) => {
          res.status(200).send(property);
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem finding the property.");
    }
  }

  create_property(req, res) {
    const body = req.body;
    const user = req.user;
    const bricks_num = body.bricks_num;

    if (user.admin == true) {
      try {
        this.property_model
          .create(
            {
              name: body.name,
            },
            (err, property) => {
              if (err) {
                return res
                  .status(500)
                  .send(
                    "There was a problem adding the information to the database."
                  );
              }
            }
          )

          .then((property) => {
            for (let i = 0; i < bricks_num; i++) {
              this.bricks_model.create({
                property_id: property.id,
                user_id: user.id,
                on_sale: true,
                price: 100,
              });
            }
            res.status(200).send(property);
          });
      } catch (err) {
        logger.error(err);
        res
          .status(500)
          .send("There was a problem adding the information to the database.");
      }
    } else {
      res.status(401).send("You are not authorized to create a property");
    }
  }
}

module.exports = propertyController;
