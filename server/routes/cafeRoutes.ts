import express from 'express';
import Cafe from '../models/Cafe'; // Adjust the import path as necessary

const router = express.Router();

// Get all cafes
router.get('/', async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.json(cafes);
  } catch (err) {
    res.status(500).send((err as any).message);
  }
});

// Add a new cafe
router.post('/', async (req, res) => {
  const cafe = new Cafe({
    name: req.body.name,
    location: req.body.location,
    hours: req.body.hours,
    menuHighlights: req.body.menuHighlights,
    photos: req.body.photos
  });

  try {
    const newCafe = await cafe.save();
    res.status(201).json(newCafe);
  } catch (err) {
    res.status(400).json( (err as any).message );
  }
});

// Get a single cafe by ID
router.get('/:id', async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    if (!cafe) {
      return res.status(404).json({ message: 'Cafe not found' });
    }
    res.json(cafe);
  } catch (err) {
    res.status(500).json((err as any).message );
  }
});

export default router;
