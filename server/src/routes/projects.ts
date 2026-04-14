import express from 'express';
import Project from '../models/Project';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: 'Project saved' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
