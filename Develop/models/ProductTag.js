const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      //TODO: need to reference the product models ID 
    },
    tag_id: {
      type: DataTypes.INTEGER,
      //TODO: Need to reference the tag models id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
