import React, { useState, FormEvent } from 'react';
import StarRating from '../ReviewPage/StarRating';
import { useAppDispatch } from '../../redux/hooks';
import { fetchReviews } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ReviewData } from '../../types/types';
import styled from 'styled-components';

interface ReviewFormProps {
  cafeId: string;
}

const ReviewFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ReviewFormElement = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FormTextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 100px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReviewForm: React.FC<ReviewFormProps> = ({ cafeId }) => {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.userInfo?.firebaseUid); // Optional chaining used here
  const [review, setReview] = useState<ReviewData>({ userId: userId || '', text: '', rating: 0, cafe: cafeId });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !cafeId) {
      console.error("Invalid user or cafe ID");
      return;
    }

    const reviewData = {
      ...review,
      user: userId,
      cafe: cafeId,
    };

    try {
      const response = await fetch(`http://localhost:5001/api/cafes/${cafeId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchReviews(cafeId));  // Refresh reviews after posting
        console.log('Review saved successfully:', data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save review');
      }
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  return (
    <ReviewFormContainer>
      <ReviewFormElement onSubmit={handleSubmit}>
        <label htmlFor="text">리뷰</label>
        <FormTextArea
          id="text"
          name="text"
          value={review.text}
          onChange={handleInputChange}
          placeholder="Your review"
          required
        ></FormTextArea>
        <label htmlFor="rating">별점</label>
        <StarRating rating={review.rating} setRating={(rating) => setReview({ ...review, rating })} />
        <SubmitButton type="submit">리뷰 제출</SubmitButton>
      </ReviewFormElement>
    </ReviewFormContainer>
  );
};

export default ReviewForm;