//src >pages> ReviewPage>ReviewPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from './StarRating'; // Adjust the import path as necessary
import styled from 'styled-components';
import { Cafe } from '../../types/cafe';
import { postReview } from '../../redux/reviewSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { ReviewData } from '../../types/types'; // Assuming ReviewData is defined here

const InlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CafeNameDisplay = styled.h3`
  margin: 20px 0;
`;

const ReviewFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ReviewForm = styled.form`
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

interface ReviewFormValues {
  user: string;
  comment: string;
  rating: number;
  photo?: File; // Optional photo file

}

const ReviewPage: React.FC = () => {
  const [review, setReview] = useState<ReviewFormValues>({ user: '', comment: '', rating: 3 });
  const [cafeName, setCafeName] = useState(''); // 카페 이름을 위한 상태 추가
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    const fetchCafeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/cafes/${id}`);
        if (!response.ok) throw new Error('Cafe not found');
        
        const data: Cafe = await response.json();
        setCafeName(data.name);
      } catch (error) {
        console.error("Fetching cafe details failed", error);
      }
    };

    fetchCafeDetails();
  }, [id]);

  // 별점 변경 핸들러 추가
  const handleRatingChange = (rating: number) => {
    setReview({ ...review, rating });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReview({ ...review, photo: e.target.files[0] });
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      console.error("Cafe ID is undefined");
      return;
    }
    const reviewData: ReviewData = {
      text: review.comment,
      rating: review.rating,
      userId: review.user, // Ensure the user ID is being correctly set or passed
    };

    // 비동기 액션 디스패치 수정 예시
    dispatch(postReview({ reviewData, cafeId: id, token: 'your_token_here' }))
    .unwrap()
    .then(() => {
      console.log('Review submitted successfully');
      navigate(`/cafes/${id}`);
    })
    .catch((error: any) => {
      console.error('Failed to submit review', error.message || 'Unknown error');
    });
    };
        // 리뷰 제출 후 페이지 이동 또는 상태 초기화
     navigate(`/cafes/${id}`);


  return (
    <ReviewFormContainer>
    <h2>리뷰 작성</h2>
    <CafeNameDisplay>{cafeName}</CafeNameDisplay>
    <ReviewForm onSubmit={handleSubmit}>
    <InlineContainer>
        <div>
          <label htmlFor="user">닉네임</label>
          <br />
          <FormInput
            type="text"
            id="user"
            name="user"
            value={review.user}
            onChange={(e) => setReview({ ...review, user: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="star">별점</label>
          <StarRating rating={review.rating} setRating={(rating) => setReview({ ...review, rating })} />
        </div>
      </InlineContainer>
      <label htmlFor="comment">리뷰</label>
      <FormTextArea
        id="comment"
        name="comment"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
        required
      />
      <label htmlFor="photo">Upload a Photo:</label>
      <FormInput
        type="file"
        id="photo"
        name="photo"
        onChange={handlePhotoChange}
      />
      <SubmitButton type="submit">Submit Review</SubmitButton>
    </ReviewForm>
  </ReviewFormContainer>
  );
};

export default ReviewPage;
