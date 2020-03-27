import * as mongoose from 'mongoose';
import { Roles } from 'src/constants/roles';

export const ActivationTokenSchema = new mongoose.Schema({
  token: String,
  userId: String
}, {
  timestamps: true
});