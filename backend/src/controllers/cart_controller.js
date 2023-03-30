const base_controller = require("./base_controller");
const inUserCartModel = require("../models/in_user_cart_model");
const user_model = require("../models/users_model");
const bricks_model = require("../models/bricks_model");
const property_model = require("../models/property_model");
const logger = require("../utils/logger");
const { ToadScheduler, CronJob, Task } = require("toad-scheduler");
const scheduler = new ToadScheduler();
class cartController extends base_controller {
  constructor() {
    super();
    this.inUserCartModel = inUserCartModel;
    this.user_model = user_model;
    this.bricks_model = bricks_model;
  }
  // with this version the response is ordered by brick then property
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
              model: this.inUserCartModel,
              include: [
                {
                  model: bricks_model,
                  include: [
                    {
                      model: property_model,
                    },
                  ],
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

  // with this version the response is ordered by property then brick
  // get_cart(req, res) {
  //   try {
  //     const user = req.user;
  //     this.user_model
  //       .findOne({
  //         where: { id: user.id },
  //         include: [
  //           {
  //             model: this.inUserCartModel,
  //             include: [
  //               {
  //                 model: bricks_model,
  //                 include: [
  //                   {
  //                     model: property_model,
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       })
  //       .then((cart) => {
  //         const cart_items = cart.in_user_carts;
  //         const cart_items_by_property = {};
  //         cart_items.forEach((item) => {
  //           const property_id = item.brick.property.id;
  //           const property_name = item.brick.property.name;
  //           if (!cart_items_by_property[property_id]) {
  //             cart_items_by_property[property_name] = {
  //               property_id: property_id,
  //               bricks: [],
  //             };
  //           }
  //           cart_items_by_property[property_name].bricks.push(item);
  //         });
  //         res.status(200).send(cart_items_by_property);
  //       });
  //   } catch (err) {
  //     logger.error(err);
  //     res.status(500).send("There was a problem in the cart controller.");
  //   }
  // }

  add_to_cart(req, res) {
    const body = req.body;
    const user = req.user;
    try {
      //only can add to cart if the brick is on sale
      this.bricks_model
        .findOne({
          where: {
            id: body.brick_id,
          },
        })
        .then((brick) => {
          if (brick.on_sale) {
            this.inUserCartModel
              .create({
                user_id: user.id,
                brick_id: body.brick_id,
                quantity: body.quantity,
              })
              .then((cart) => {
                //send updated cart
                this.user_model
                  .findOne({
                    where: {
                      id: user.id,
                    },
                    include: [
                      {
                        model: this.inUserCartModel,
                        include: [
                          {
                            model: bricks_model,
                            include: [
                              {
                                model: property_model,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  })
                  .then((cart) => {
                    res.status(200).send(cart);
                  });
              });
          } else {
            res.status(400).send("Brick not on sale");
          }
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
            id: req.params.id,
          },
        })
        .then((cart) => {
          // send updated cart
          this.user_model
            .findOne({
              where: {
                id: user.id,
              },
              include: [
                {
                  model: this.inUserCartModel,
                  include: [
                    {
                      model: bricks_model,
                      include: [
                        {
                          model: property_model,
                        },
                      ],
                    },
                  ],
                },
              ],
            })
            .then((cart) => {
              res.status(200).send(cart);
            });
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem in the cart controller.");
    }
  }

  remove_all_items_from_cart(req, res) {
    const user = req.user;
    try {
      this.inUserCartModel
        .destroy({
          where: {
            user_id: user.id,
          },
        })
        .then((cart) => {
          res.status(200).send("Cart deleted");
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem in the cart controller.");
    }
  }

  buy_bricks(req, res) {
    const user = req.user;
    try {
      // get bricks from cart
      this.user_model
        .findOne({
          where: { id: user.id },
          include: [
            {
              model: this.inUserCartModel,
              include: [
                {
                  model: bricks_model,
                  include: [
                    {
                      model: property_model,
                    },
                  ],
                },
              ],
            },
          ],
        })
        .then((cart) => {
          //change user_id to new user
          const cart_items = cart.in_user_carts;

          cart_items.forEach((item) => {
            item.user_id = user.id;
            item.save();
          });
          res.status(200).send("bricks bought");
          //delete cart
          this.inUserCartModel.destroy({
            where: {
              user_id: user.id,
            },
          });
          //cancel cronjob

          scheduler.removeById(user.id);
        });
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem in the cart controller.");
    }
  }

  checkout(req, res) {
    const user = req.user;
    try {
      if (req.body.ts === "Y") {
        // change cart bricks on_sale to false
        this.user_model
          .findOne({
            where: { id: user.id },
            include: [
              {
                model: this.inUserCartModel,
                include: [
                  {
                    model: bricks_model,
                    include: [
                      {
                        model: property_model,
                      },
                    ],
                  },
                ],
              },
            ],
          })
          .then((cart) => {
            const cart_items = cart.in_user_carts;
            cart_items.forEach((item) => {
              item.brick.on_sale = 0;
              item.brick.save();
            });
            //job after 3 minutes
            const task = new Task(user.id, () => {
              this.user_model
                .findOne({
                  where: { id: user.id },
                  include: [
                    {
                      model: this.inUserCartModel,
                      include: [
                        {
                          model: bricks_model,
                          include: [
                            {
                              model: property_model,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                })
                .then((cart) => {
                  const cart_items = cart.in_user_carts;
                  // if any brick is not on sale, then the cart cannot be checked out
                  cart_items.forEach((item) => {
                    if (!item.brick.on_sale) {
                      res.status(400).send("Brick not on sale");
                    }
                  });
                  cart_items.forEach((item) => {
                    item.brick.on_sale = 1;
                    item.brick.save();
                  });
                  scheduler.removeById(user.id);
                });
            });
            const job = new CronJob({ cronExpression: "*/3 * * * *" }, task, {
              id: user.id,
            });
            scheduler.addCronJob(job);

            res
              .status(200)
              .send(
                "Bricks checked out, you have 3 minutes to complete the order"
              );
          });
      } else {
        res.status(400).send("You must agree to the terms and conditions");
      }
    } catch (err) {
      logger.error(err);
      res.status(500).send("There was a problem in the cart controller.");
    }
  }
}

module.exports = cartController;
