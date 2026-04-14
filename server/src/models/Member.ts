import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  skills: [String],
  experience: Number,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
