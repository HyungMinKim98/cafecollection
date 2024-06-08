// server>routes>cafeRoutes.ts
import express from 'express';
import Cafe from '../models/Cafe'; // Adjust the import path as necessary
import Review from '../models/Review';

const router = express.Router();

// Get all cafes
router.get('/cafes', async (req, res) => {
  console.log(req.url, req.method, req.params);
  try {
    const cafes = await Cafe.find();
    res.json(cafes);
  } catch (err) {
    console.error(err);
    res.status(500).send((err as any).message);

  }
});

// Add a new cafe
router.post('/cafes', async (req, res) => {
  const cafe = new Cafe({
    name: req.body.name,
    location: req.body.location,
    hours: req.body.hours,
    menuHighlights: req.body.menuHighlights,
    photo: req.body.photo 
  });

  try {
    const newCafe = await cafe.save();
    res.status(201).json(newCafe);
  } catch (err) {
    res.status(400).json( (err as any).message );
  }
});

router.get('/cafes/:id/reviews', async (req, res) => {
  try {
      const { id } = req.params;
      const reviews = await Review.find({ cafe: id }); // Assuming 'cafe' is a valid field in your Review model
      res.json(reviews);
  } catch (error) {
      res.status(500).send((error as any).message);
  }
});

// Add a new review
router.post('/cafes/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { user, content, rating } = req.body; // Assume these are provided in the body of the request
  console.log("Received review data:", req.body); // Log the incoming data

  const newReview = new Review({
    cafe: id,
    user,     // These should correspond to actual document IDs in MongoDB
    content,
    rating
  });

  try {
    const savedReview = await newReview.save();
    console.log("Saved review:", savedReview); // Log the saved review
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error saving review:", error); // Log any errors
    res.status(500).json({ message: (error as any).message });
  }
});

// Get a single cafe by ID
router.get('/cafes/:id', async (req, res) => {
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
/**
 * @swagger
 * /cafes:
 *   get:
 *     summary: List all cafes
 *     responses:
 *       200:
 *         description: A list of cafes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cafe'
 */


export default router;
