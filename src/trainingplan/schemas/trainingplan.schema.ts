import * as mongoose from 'mongoose';

export const TrainingPlanSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
  intensity: Number,
}, {
  timestamps: true
});