import React, { useState, FormEvent } from 'react';
import StarRating from './StarRating';

interface Review {
  id?: string;
  user: string;
  comment: string;
  rating: number; // 별점 정보 추가
  cafeId: string;
}

interface ReviewFormProps {
  cafeId: string;
  onSubmit: (review: Review) => void;
}

const handleReviewSubmit = async (review: Review) => {
  try {
    await fetch(`http://localhost:5000/reviews`, { // Ensure this URL is correct
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    // Fetch the updated list of reviews here or append it optimistically
  } catch (error) {
    console.error('Failed to submit review:', error);
  }
};
const ReviewForm: React.FC<ReviewFormProps> = ({ cafeId, onSubmit }) => {
  const [user, setUser] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0); // 별점 상태 추가

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ cafeId, user, comment, rating }); // 별점 정보도 함께 제출
    setUser('');
    setComment('');
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Your name"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review"
        required
      ></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
