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

router.get("/final_cart", controller.authenticateToken, async (req, res) => {
  try {
    const cart = controller.get_final_cart(req, res);
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

router.post("/buy", controller.authenticateToken, async (req, res) => {
  try {
    const cart = controller.buy_bricks(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem buying bricks.");
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

// create a route to delete single item from cart
router.delete("/item/:id", controller.authenticateToken, async (req, res) => {
  try {
    const cart = controller.remove_from_cart(req, res);
  } catch (err) {
    logger.error(err);
    res.status(500).send("There was a problem setting the cart.");
  }
});

module.exports = router;
