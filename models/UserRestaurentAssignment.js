
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserRestaurantAssignment = sequelize.define('user_restaurant_assignment', {
    assignment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: 'restaurant_id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'restaurant_id'],
      },
    ],
  });
  
  module.exports = UserRestaurantAssignment;