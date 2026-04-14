import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: String,
  portfolio: String,
  message: String,
  status: { type: String, enum: ['new', 'reviewed', 'interview', 'rejected'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
