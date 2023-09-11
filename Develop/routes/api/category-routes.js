const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // This retrieves all categories and its products, a model of 'Product' must be included.
  try {
    const category = await Category.findAll({
      include:[{ model: Product }],
    });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/:id', async (req, res) => {
	// This retrieves a category by id and the products in said category, a model of 'Product' must be included.
	try {
		const category = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.status(200).json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post('/', async (req, res) => {
  // This creates a new category, it uses the model 'Category'.
    try {
			const category = await Category.create(req.body);
			res.status(201).json(category);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal server error" });
		}
});

router.put('/:id', async (req, res) => {
	// This updates a category by its id, it uses the model 'Category'.
	try {
		const category = await Category.findByPk(req.params.id);
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		await category.update(req.body);
		res.json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.delete('/:id', async (req, res) => {
	// This deletes a category by its id, it uses the model 'Category'.
	try {
		const category = await Category.findByPk(req.params.id);
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		await category.destroy();
		res.sendStatus(204).json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
