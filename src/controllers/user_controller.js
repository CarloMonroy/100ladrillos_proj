base_controller = require("./base_controller");
bcrypt = require("bcrypt");
jwt = require("jsonwebtoken");

class userController extends base_controller {
  constructor() {
    this.model = require("../models/users_model");
  }

  create(res, data) {
    // Creates a new user in the database
    try {
      existing_user = this.model.findOne({ email: data.email });
      if (existing_user) {
        res.status(400).send("User already exists");
      } else {
        this.model.create(
          {
            email: data.email,
            password: this.hashPassword(data.password),
          },
          function (err, user) {
            if (err) {
              return res
                .status(500)
                .send(
                  "There was a problem adding the information to the database."
                );
            }
            res.status(200).send(user);
          }
        );
      }
    } catch (err) {
      logger.error(err);
      res
        .status(500)
        .send("There was a problem adding the information to the database.");
    }
  }

  login(res, data) {
    user = this.model.findOne({ email: data.email });
    if (!user) {
      res.status(400).send("User does not exist");
    }
    if (this.comparePassword(data.password, user.password)) {
      // Create jwt token
      token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });
    } else {
      res.status(401).send("Invalid password");
    }
  }
}
