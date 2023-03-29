const { Sequelize, DataTypes, Model } = require("sequelize");
const base_controller = require("../controllers/base_controller");
const controller = new base_controller();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

users.hasMany(require("./in_user_cart_model"), { foreignKey: "user_id" });
users.hasMany(require("./bricks_model"), { foreignKey: "user_id" });

users.sync();

// if table is empty create admin user
controller.hashPassword("password").then((hash) => {
  users.count().then((count) => {
    if (count === 0) {
      users.create({
        email: "email@gmail.com",
        password: hash,
        admin: true,
      });
    }
  });
});

module.exports = users;
