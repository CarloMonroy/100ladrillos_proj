const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const bricks = sequelize.define("bricks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  on_sale: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  buyer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

bricks.sync();

module.exports = bricks;
