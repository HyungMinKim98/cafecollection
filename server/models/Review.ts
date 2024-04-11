import mongoose, { Document, Schema } from 'mongoose';

interface IReview extends Document {
  cafe: mongoose.Schema.Types.ObjectId;
  User: mongoose.Schema.Types.ObjectId;
  content: string;
  rating: number;
  date: Date;
}

const reviewSchema: Schema = new Schema({
  cafe: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafe', required: true },
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model<IReview>('Review', reviewSchema);
