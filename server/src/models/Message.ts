import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
