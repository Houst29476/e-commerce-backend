const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: {
      model: Product,
      attributes: ["product_name"],
    },
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["category_id"],
    },
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // create a new category
});

router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No Category found with that ID." });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No Category found with that ID." });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // delete a category by its `id` value
});

module.exports = router;
