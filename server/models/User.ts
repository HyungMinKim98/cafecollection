// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  region: String,
  // 추가 필드
});

const User = mongoose.model('User', userSchema);

export default User;
