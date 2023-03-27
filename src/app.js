const express = require("express");
const morganMiddleware = require("./middlewares/morgan.middleware");
const logger = require("./utils/logger");
// import orm
const { Sequelize } = require("sequelize");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(cors()); // cors for enabling all origins
// connect sequlize to mysql database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  logger.info("Connection has been established successfully.");
} catch (error) {
  logger.error("Unable to connect to the database:", error);
}

//add routes
app.use("/user", require("./routes/user_routes"));
app.use("/bricks", require("./routes/bricks_routes"));
app.use("/property", require("./routes/property_routes"));

// use morgan middleware
app.use(morganMiddleware);

app.listen(PORT, () => {
  logger.info("Server started on port " + PORT + "");
});
