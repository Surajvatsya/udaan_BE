const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("../models/Restaurant");
const PointOfContact = require("../models/PointOfContact");

const Interaction = sequelize.define("interaction", {
  interaction_id: {
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
  poc_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PointOfContact,
      key: "poc_id",
    },
    onDelete: "SET NULL",
  },
  interaction_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interaction_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  outcome: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  interaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  follow_up_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Interaction;
