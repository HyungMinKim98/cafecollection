import mongoose, { Document, Schema } from 'mongoose';

interface ICafe extends Document {
  name: string;
  location: {
    type: string;
    coordinates: number[];
  };
  hours: string;
  menuHighlights: string[];
  photos: string[];
}

const cafeSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  hours: String,
  menuHighlights: [String],
  photos: [String]
});

export default mongoose.model<ICafe>('Cafe', cafeSchema);
