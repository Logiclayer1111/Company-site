import express from 'express';
import { authenticateToken } from '../middleware/auth';
import Message from '../models/Message';
import Project from '../models/Project';
import Application from '../models/Application';
import Member from '../models/Member';

const router = express.Router();

// Protect all routes
router.use(authenticateToken);

// Messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/messages/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/applications/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/applications/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Members CRUD
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/members', async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/members/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
