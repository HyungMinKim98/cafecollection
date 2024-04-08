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

// GET a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
// 사용자 지역 정보 업데이트
// Example for a GET request
router.get('/users/:firebaseUid/region', async (req, res) => {
  const firebaseUid = req.params.firebaseUid;

  try {
    const user = await User.findOne({ firebaseUid: firebaseUid });
    if (user && user.region) {
      res.json({ region: user.region });
    } else {
      res.status(404).json({ message: 'Region not found for the user.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user region' });
  }
});

// Example for a POST request
router.post('/users/:firebaseUid/updateRegion', async (req, res) => {
  const firebaseUid = req.params.firebaseUid;
  const { region } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ firebaseUid: firebaseUid }, { region: region }, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user region.' });
  }
});

export default router;
