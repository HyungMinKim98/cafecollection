// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  firebaseUid: string; // Add this line
  favorites?: mongoose.Types.ObjectId[]; // 이제 선택적입니다.
  region?: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: false }, // 이름도 선택적일 수 있습니다.
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firebaseUid: { type: String, required: true, unique: true }, // Ensure it's required and unique
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Cafe', required: false }], // 선택적 필드
  region: { type: String, required: false }, // 지역도 선택적일 수 있습니다.
});

export default mongoose.model<IUser>('User', userSchema);

