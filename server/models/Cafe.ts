import mongoose, { Document, Schema } from 'mongoose';

interface ICafe extends Document {
  name: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  hours: string;
  menuHighlights: string[];
  photo: string;
  description: string; // Add this line to include the description
}

const cafeSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true }, // 주소 필드 추가
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  hours: String,
  menuHighlights: [String],
  photo: String,
  description: String,
});

const Cafe = mongoose.models.Cafe || mongoose.model<ICafe>('Cafe', cafeSchema);

export default Cafe;