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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

bricks.belongsTo(require("./users_model"), { foreignKey: "user_id" });
bricks.belongsTo(require("./property_model"), { foreignKey: "property_id" });

bricks.sync();

module.exports = bricks;
