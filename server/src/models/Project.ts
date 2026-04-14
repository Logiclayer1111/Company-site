import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  phone: String,
  service: { type: String, required: true },
  budget: String,
  timeline: String,
  description: { type: String, required: true },
  goals: String,
  status: { type: String, default: 'new' },
  priority: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
