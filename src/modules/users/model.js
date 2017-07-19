import mongoose, { Schema } from 'mongoose';

const UserSchema = Schema({
  email: String,
});

export default mongoose.model('User', UserSchema);
