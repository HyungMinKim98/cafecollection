//server>routes> userRoutes.ts
import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 사용자 프로필 조회
router.get('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;

  try {
    const user = await User.findOne({ firebaseUid });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// 사용자 프로필 업데이트
router.post('/updateProfile', async (req, res) => {
  const { firebaseUid, name, email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid }, // Firebase UID를 사용하여 사용자 식별
      { name, email }, // 이름과 이메일 정보 업데이트
      { new: true } // 업데이트된 문서 반환
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;