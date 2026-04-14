import express from 'express';
import Message from '../models/Message';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ message: 'Contact saved' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
