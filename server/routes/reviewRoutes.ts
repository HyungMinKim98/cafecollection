// src/redux/reducers/reviewReducer.ts

import express from 'express';
import Review from '../models/Review';

const router = express.Router();

// POST a new review
router.post('/reviews', async (req, res) => {
  console.log('POST /api/reviews route accessed'); // Logging statement
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error saving review:', error); // Log any errors
    res.status(400).send(error);
  }
});

export default router;
