const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [{
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const productData = await Product.findByPk(req.params.id, {
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [{
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }]
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
// Create a new product
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.product_name || !req.body.price || !req.body.stock) {
      return res.status(400).json({ error: 'Product name, price, and stock are required' });
    }

    const product = await Product.create(req.body);

    if (req.body.tagIds && Array.isArray(req.body.tagIds) && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));

      await ProductTag.bulkCreate(productTagIdArr);
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


// update product
router.put('/:id', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.product_name || !req.body.price || !req.body.stock) {
      return res.status(400).json({ error: 'Product name, price, and stock are required' });
    }

    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // Create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
      ? req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => ({
            product_id: req.params.id,
            tag_id,
          }))
      : [];

    // Find tag_ids to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // Run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      newProductTags.length > 0 ? ProductTag.bulkCreate(newProductTags) : Promise.resolve(),
    ]);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    //not sure if need this if statement or not 
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
