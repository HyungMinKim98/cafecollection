import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/:firebaseUid', async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ userId: user._id });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
});

export default router;