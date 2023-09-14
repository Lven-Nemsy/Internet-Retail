const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// This retrieves all tags and its products, model of 'Product' must be included.
	try {
		const tag = await Tag.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.get('/:id', async (req, res) => {
	// This retrieves a tag by id and the products in said tag, model of 'Product' must be included.
	try {
		const tag = await Tag.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}
		res.status(200).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/", async (req, res) => {
	// This creates a new tag, it uses the model 'Tag'.
	try {
		const tag = await Tag.create(req.body);
		res.status(201).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.put('/:id', async (req, res) => {
	// This updates a tag by its id, it uses the model 'Tag'.
	try {
		const tag = await Tag.findByPk(req.params.id);
		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}
		await tag.update(req.body);
		res.json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.delete('/:id', async (req, res) => {
	// This deletes a tag by its id, it uses the model 'Tag'.
	try {
		const tag = await Tag.findByPk(req.params.id);
		if (!tag) {
			res.status(404).json({ error: "Tag not found" });
			return;
		}
		await tag.destroy();
		res.sendStatus(204).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
