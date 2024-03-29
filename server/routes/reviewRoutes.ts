import express from 'express';
import Review from '../models/Review';

const router = express.Router();

// POST a new review
router.post('/reviews', async (req, res) => {
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
