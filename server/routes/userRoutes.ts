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
  console.log("Lookup for UID:", firebaseUid); // 로깅 추가

  try {
    const user = await User.findOne({ firebaseUid });
    if (user) {
      console.log("User found:", user);
      res.json(user);
    } else {
      console.log("User not found for UID:", firebaseUid); // 로깅 추가
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error("Error on fetching user:", error); // 에러 로깅 추가
    res.status(500).json({ message: 'Server error.' });
  }
});


// 사용자 프로필 업데이트
router.post('/:firebaseUid/update', async (req, res) => {
  const { firebaseUid } = req.params;
  const { name, email, region } = req.body;

  console.log(`Update request received for UID: ${firebaseUid}`, req.body);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid }, 
      { name, email, region },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      console.log(`Updated User:`, updatedUser);
      res.json(updatedUser);
    } else {
      console.log(`User not found for UID: ${firebaseUid}`);
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Unknown error occurred.' });
  }
});
export default router;