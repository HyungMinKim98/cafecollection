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

// Add a new user
router.post('/', async (req, res) => {
  const user = new User({
    firebaseUid: req.body.firebaseUid,
    name: req.body.name,
    email: req.body.email,
    region: req.body.region 
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json( (err as any).message );
  }
});

// 사용자 프로필 조회
router.get('/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  console.log("Received request for UID:", req.params.firebaseUid);

  try {
    const user = await User.findOne({ firebaseUid });
    console.log("Received request for UID:", req.params.firebaseUid);
    if (user) {
      res.json(user);
      console.log("Received request for UID:", req.params.firebaseUid);
    } else {
      res.status(404).json({ message: 'User not found.' });
      console.log("Received request for UID:", req.params.firebaseUid);

    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// 사용자 프로필 업데이트
router.post('/updateProfile', async (req, res) => {
  console.log("Update request received for UID:", req.body.firebaseUid);
  const { firebaseUid, name, email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid }, // Firebase UID를 사용하여 사용자 식별
      { name, email }, // 이름과 이메일 정보 업데이트
      { new: true } // 업데이트된 문서 반환
    );
    console.log("Updated User:", updatedUser);

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