//server>routes> userRoutes.ts
import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 사용자 프로필 조회
router.get('/:firebaseUid/region', async (req, res) => {
  console.log(`Fetching region for UID: ${req.params.firebaseUid}`);
  const { firebaseUid } = req.params;

  try {
    const user = await User.findOne({ firebaseUid });
    console.log(firebaseUid);
    if (user) {
      res.json({ region: user.region });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/:firebaseUid/region', async (req, res) => {
  console.log(req.body); // 요청 본문 출력
  const { firebaseUid } = req.params;
  const { region } = req.body; // 예시로, region 정보를 업데이트하는 로직을 구현

  // 데이터베이스에서 firebaseUid를 사용하여 사용자를 찾고, region 정보를 업데이트하는 로직 구현
});

// 사용자 프로필 업데이트
router.post('/:firebaseUid/updateRegion', async (req, res) => {
  const { firebaseUid } = req.params;
  const { region } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ firebaseUid }, { region }, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user data:', (error as any).message);
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;