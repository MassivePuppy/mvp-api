import * as mongoose from 'mongoose';
import { Roles } from 'src/constants/roles';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  roles: {type: [String], default: [Roles.USER]},
  isActive: {type: Boolean, default: false}
}, {
  timestamps: true
});