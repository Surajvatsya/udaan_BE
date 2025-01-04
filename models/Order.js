const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("../models/Restaurant");
const PointOfContact = require("../models/PointOfContact");

const Order = sequelize.define("order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restaurant,
      key: "restaurant_id",
    },
    onDelete: "CASCADE",
  },
  order_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PointOfContact,
      key: "poc_id",
    },
    onDelete: "CASCADE",
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Order;
