const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const logger = require("../utils/logger");
const cart_controller = require("../controllers/cart_controller");
const json = express.json();

const controller = new cart_controller();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(json);
router.get("", controller.authenticateToken, async (req, res) => {
  try {
    const cart = controller.get_cart(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem finding the cart.");
  }
});

router.post("", controller.authenticateToken, async (req, res) => {
  try {
    const cart = controller.add_to_cart(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem setting the cart.");
  }
});

router.delete("", controller.authenticateToken, async (req, res) => {
  try {
    const cart = controller.remove_all_items_from_cart(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem setting the cart.");
  }
});

router.post("/checkout", controller.authenticateToken, async (req, res) => {
  try {
    const cart = controller.checkout(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem setting the cart.");
  }
});

module.exports = router;
