import express from 'express';
import User from '../models/User';

const router = express.Router();

// GET a user by ID
router.get('api/users/:id', async (req, res) => {
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

export default router;
