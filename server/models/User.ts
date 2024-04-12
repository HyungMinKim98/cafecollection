// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },  // Not required, depends on user providing it
  region: { type: String },  // Not required
  profilePhotoUrl: { type: String },  // Optional, can be set from Firebase
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cafe' }],  // Array of cafe IDs
}, {
  timestamps: true  // Automatically create 'createdAt' and 'updatedAt' fields
});

const User = mongoose.model('User', userSchema);

export default User;