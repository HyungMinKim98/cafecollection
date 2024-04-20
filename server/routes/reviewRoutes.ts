// src/redux/reducers/reviewReducer.ts

import express, { Request, Response, NextFunction } from 'express';
import Review from '../models/Review';

const router = express.Router();

// Middleware to check if the user is authenticated
function authenticate(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      res.status(401).send('Authentication required');
      return;
  }
  // Suppose your token is valid
  next();
}

// POST a new review to a specific cafe
router.post('/:cafeId/reviews', authenticate, async (req: Request, res: Response) => {
  const { cafeId } = req.params;
  const { userId, text, rating } = req.body;

  try {
      const newReview = new Review({
          cafe: cafeId,
          user: userId,
          content: text,
          rating
      });
      await newReview.save();
      res.status(201).json(newReview);
  } catch (error) {
      res.status(500).json({ message: 'Failed to post review', error: (error as Error).message });
  }
});

// GET all reviews for a specific cafe
router.get('/:cafeId/reviews', async (req: Request, res: Response) => {
  const { cafeId } = req.params;
  try {
      const reviews = await Review.find({ cafe: cafeId });
      res.json(reviews);
  } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve reviews', error: (error as Error).message });
  }
});

export default router;
