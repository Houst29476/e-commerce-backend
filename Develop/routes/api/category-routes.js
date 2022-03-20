const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// ----- findAll Categories & associated Products ----- //
router.get('/', async (req, res) => {
  
  Category.findAll(
    {
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    }
  )
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ----- findOne Category by `ID` value & associated Products ------ //
router.get('/:id', async (req, res) => {

  Category.findOne(
    {
      where: {
        id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ----- Create a New Category ----- //
router.post("/", async (req, res) => {
  
  Category.create({
      category_name: req.body.category_name
    })
    
      .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// ----- Update a Category by its `ID` value ----- //
router.put('/:id', async (req, res) => {
  
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    })
  
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ------ Delete a Category by its `ID` value ------ //
router.delete('/:id', async (req, res) => {
  
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
 });

module.exports = router;
