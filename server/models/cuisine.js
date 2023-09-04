'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Cuisine.belongsTo(models.Category, { foreignKey: 'categoryId' })
    Cuisine.belongsTo(models.User, { foreignKey: 'authorId' })
    }
  }
  Cuisine.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Name is required` },
        notEmpty: { msg: `Name is required` }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Description is required` },
        notEmpty: { msg: `Description is required` }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Stock is required` },
        notEmpty: { msg: `Stock is required` }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Price is required` },
        notEmpty: { msg: `Price is required` }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Image url is required` },
        notEmpty: { msg: `Image url is required` }
      }
    },
    status: {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Status is required` },
          notEmpty: { msg: `Status is required` }
        },
        defaultValue: "Active"
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Author ID is required` },
        notEmpty: { msg: `Author ID is required` }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Category Id is required` },
        notEmpty: { msg: `Category Id is required` }
      }
    }
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};