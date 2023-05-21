
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
})

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'CASCADE'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
