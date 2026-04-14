import express from 'express';
import Application from '../models/Application';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ message: 'Application saved' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
