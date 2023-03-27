base_controller = require("./base_controller");
bcrypt = require("bcrypt");
logger = require("../utils/logger");
user_model = require("../models/users_model");
jwt = require("jsonwebtoken");

class userController extends base_controller {
  constructor() {
    super();
    this.user_model = user_model;
  }

  create(res, data) {
    // Creates a new user in the database
    try {
      let user = this.user_model
        .findOne({
          where: { email: data.email },
        })
        .then((user) => {
          if (user) {
            res.status(400).send("User already exists");
          } else {
            this.hashPassword(data.password).then((hash) => {
              this.user_model
                .create(
                  {
                    email: data.email,
                    password: hash,
                  },
                  function (err, user) {
                    if (err) {
                      return res
                        .status(500)
                        .send(
                          "There was a problem adding the information to the database 1."
                        );
                    }
                  }
                )
                .then((user) => {
                  // return sucess status and user jwt
                  var token = jwt.sign({ id: 1 }, process.env.SECRET, {});
                  logger.info("token: " + token);
                  res.status(200).send({ info: "User created", token: token });
                });
            });
          }
        });
    } catch (err) {
      logger.error(err);
      res
        .status(500)
        .send("There was a problem adding the information to the database");
    }
  }
}

module.exports = userController;
