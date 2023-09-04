'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, { foreignKey: 'customerId' })
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Email is required` },
        notEmpty: { msg: `Email is required` },
        isEmail: { msg: `Invalid email` },
      },
      unique: { msg: `Your email has been registered` }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Password is required` },
        notEmpty: { msg: `Password is required` }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Role is required` },
        notEmpty: { msg: `Role is required` }
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((customer) => {
    customer.password = hashPassword(customer.password)
  })
  return Customer;
};