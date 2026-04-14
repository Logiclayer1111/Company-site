import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'build something useful';

router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create/find admin user
    let user = await User.findOne({ username: 'admin' });
    if (!user) {
      const hashedPw = await bcrypt.hash(password, 10);
      user = new User({ username: 'admin', password: hashedPw });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id, role: 'admin' }, process.env.JWT_SECRET || 'fallback', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
