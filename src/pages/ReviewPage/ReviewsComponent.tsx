// src>pages>ReviewPage>ReviewsComponent.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../../redux/reviewSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/hooks';
import { Review } from '../../types/types';

interface ReviewsComponentProps {
  _id: string;
  reviews: Review[];
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({ _id }) => {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);
  const { cafe } = useSelector((state: RootState) => state.cafe); // Change from cafeState to cafe

  useEffect(() => {
    if (cafe?._id) {
      dispatch(fetchReviews(cafe._id));
    }
  }, [dispatch, cafe?._id]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;

  return (
    <div>
      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsComponent;
