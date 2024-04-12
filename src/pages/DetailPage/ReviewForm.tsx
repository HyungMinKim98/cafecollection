import React, { useState, FormEvent } from 'react';
import StarRating from '../ReviewPage/StarRating';
import { Review } from '../../types/types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchReviews } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface ReviewFormProps {
  cafeId: string;
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
const ReviewForm: React.FC<ReviewFormProps> = ({ cafeId }) => {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.userInfo?.firebaseUid); // Optional chaining used here
  const [user, setUser] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !cafeId) {
      console.error("Invalid user or cafe ID");
      return;
    }
    const reviewData = {
      user: userId,
      content: comment,
      cafe: cafeId,
      rating
    };

    try {
      const response = await fetch('http://localhost:5001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchReviews(cafeId));  // Refresh reviews after posting
        console.log('리뷰 저장 성공:', data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || '리뷰 저장 실패');
      }
    } catch (error) {
      console.error('리뷰 저장 중 오류 발생:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review"
        required
      ></textarea>
      <button type="submit">리뷰 제출</button>
    </form>
  );
};

export default ReviewForm;
