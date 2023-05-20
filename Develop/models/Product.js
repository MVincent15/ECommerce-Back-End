// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      //TODO: need validation that value is a decimal 
    },
    stock: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      //TODO: Set default value of 10
      //need validation that value is numbers 
    },
    category_id: {
      type: DataTypes.INTEGER,
      //TODO: Need to reference the category models ID 
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
