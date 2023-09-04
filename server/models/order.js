'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, { foreignKey: 'customerId' })
      Order.belongsTo(models.Cuisine, { foreignKey: 'cuisineId' })
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Customer ID is required` },
        notEmpty: { msg: `Customer ID is required` }
      }
    },
    cuisineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Cuisine ID is required` },
        notEmpty: { msg: `Cuisine ID is required` }
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};