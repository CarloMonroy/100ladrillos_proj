const { Sequelize, DataTypes, Model } = require("sequelize");
const bricks = require("./bricks_model");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const properties = sequelize.define("properties", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

properties.hasMany(bricks, { foreignKey: "property_id" });
bricks.belongsTo(properties, { foreignKey: "property_id" });

properties.sync();

module.exports = properties;
