// src/pages/ReviewPage/ReviewsComponent.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../../redux/reviewSlice';
import { RootState } from '../../redux/store';
import { Review } from '../../types/types';
import styled from 'styled-components';
import StarRating from './StarRating';

interface ReviewsComponentProps {
  cafeId: string;
}

const Reviewtitle = styled.div`
  margin: 20px;
  font-size: 22px;
`

const ReviewContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const UserName = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
`;

const ReviewText = styled.p`
  margin: 10px;
  font-size: 14px;
`;

const ReviewRating = styled.p`
  margin: 0;
  font-size: 12px;
  color: #555;
`;


const ReviewsComponent: React.FC<ReviewsComponentProps> = ({ cafeId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(cafeId) as any);
  }, [dispatch, cafeId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;
  console.log(reviews);
  return (
    <div>
      <Reviewtitle>Reviews</Reviewtitle>
      {reviews.length > 0 ? (
        reviews.map((review: Review) => (
          <ReviewContainer key={review.id}>
            <UserProfileImage src="https://via.placeholder.com/40" alt="User Profile" />
            <ReviewContent>
              <ReviewRating>
                <StarRating rating={review.rating || 0} size={14} /> {/* Size prop 추가 */}
              </ReviewRating>              
              <ReviewText>{review.content}</ReviewText>
            </ReviewContent>
          </ReviewContainer>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsComponent;