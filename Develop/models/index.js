// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  //what needs to go here(product key, foregin key)???
})
// Categories have many Products
Category.hasMany(Product, {
  //what needs to go here(product key, foreign key)???
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  //need to add through Product Tag 
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  //need to add through Product Tag 
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
