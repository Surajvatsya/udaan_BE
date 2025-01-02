
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('../models/Order'); 


const Item = sequelize.define('item', {
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Order,
          key: 'order_id',
        },
        onDelete: 'CASCADE',
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
  });

module.exports = Item;