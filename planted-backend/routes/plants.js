const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new plant
router.post('/', async (req, res) => {
  const plant = new Plant({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  });

  try {
    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;