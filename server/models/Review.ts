import mongoose, { Document, Schema } from 'mongoose';

interface IReview extends Document {
  cafe: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  rating: number;
  date: Date;
}

const reviewSchema: Schema = new Schema({
  cafe: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafe', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Corrected from 'User' to 'user' for consistency
  content: { type: String, required: true, maxlength: 500 },  // Ensuring there's a max length
  rating: { type: Number, required: true, min: 1, max: 5 },   // Ensuring ratings are within a logical range
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
