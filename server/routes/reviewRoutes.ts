// server/routes/reviewRoutes.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Review from '../models/Review';
import User from '../models/User';  // User 모델을 가져옵니다.


const router = express.Router();

router.post('/cafes/:cafeId/reviews', async (req: Request, res: Response) => {
  const { cafeId } = req.params;
  const { user, content, rating } = req.body;

  try {
    // firebaseUid를 기반으로 MongoDB ObjectId를 조회합니다.
    const userRecord = await User.findOne({ firebaseUid: user });
    if (!userRecord) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReview = new Review({
      cafe: new mongoose.Types.ObjectId(cafeId),  // cafeId를 ObjectId로 변환
      user: userRecord._id,  // user의 ObjectId를 사용
      content,
      rating,
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