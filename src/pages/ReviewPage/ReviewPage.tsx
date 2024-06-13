import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryClient, useMutation, useQuery } from 'react-query'; // React Query 사용
import { RootState } from '../../redux/store';
import { ReviewData } from '../../types/types';
import StarRating from '../ReviewPage/StarRating';
import { useSelector } from 'react-redux'; // Redux 사용
import { fetchCafeDetails } from '../../api/cafeApi';
import ReviewsComponent from './ReviewsComponent'; // ReviewsComponent 추가

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
  margin: 12px 0;
  &:hover {
    background-color: #0056b3;
  }
`;

const CafeNameDisplay = styled.h3`
  margin: 20px 0;
`;

// React Query로 리뷰 작성 API 호출
const postReview = async (reviewData: ReviewData) => {
  const response = await fetch(`http://localhost:5001/api/cafes/${reviewData.cafe}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to save review');
  }
  return response.json();
};

const ReviewPage: React.FC = () => {
  const [cafeName, setCafeName] = useState('');
  const [userId, setUserId] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const firebaseUid = useSelector((state: RootState) => state.user.userInfo?.firebaseUid);  //Redux 사용 부분
  const [review, setReview] = useState<ReviewData>({ user: '', content: '', rating: 0, cafe: id || '' });

  const queryClient = useQueryClient();

  // React Query로 카페 상세 정보 가져오기
  const { isError: isCafeError } = useQuery(['cafeDetails', id], () => fetchCafeDetails(id!), {
    onSuccess: (data) => {
      setCafeName(data.name);
    },
    enabled: !!id,
  });

  // 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      if (firebaseUid) {
        try {
          console.log(`Fetching user ID for firebaseUid: ${firebaseUid}`);
          const response = await fetch(`http://localhost:5001/api/users/${firebaseUid}`);
          const data = await response.json();
          console.log(`Received user data: ${JSON.stringify(data)}`);
          setUserId(data._id);
          setReview((prevReview) => ({ ...prevReview, user: data._id }));
        } catch (error) {
          console.error('Failed to fetch user ID:', error);
        }
      }
    };

    fetchUserId();
  }, [firebaseUid]);

 // React Query로 리뷰 작성 처리
 const mutation = useMutation(postReview, {
  onSuccess: () => {
    queryClient.invalidateQueries(['cafeDetails', id]);
    navigate(`/cafes/${id}`);
  }
});

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Submitting review for userId: ${userId}, cafeId: ${id}, content: ${review.content}, rating: ${review.rating}`);
    if (!userId) {
      console.error("Invalid user");
      return;
    }
    if (!id) {
      console.error("Invalid cafe ID");
      return;
    }
    mutation.mutate({ ...review, user: userId, cafe: id });
  };

  if (isCafeError) {
    return <div>Error loading cafe details.</div>;
  }

  return (
    <ReviewFormContainer>
      <h2>리뷰 작성</h2>
      <CafeNameDisplay>{cafeName}</CafeNameDisplay>
      <ReviewFormElement onSubmit={handleSubmit}>
        <label htmlFor="content">리뷰</label>
        <FormTextArea
          id="content"
          name="content"
          value={review.content}
          onChange={handleInputChange}
          placeholder="Your review"
          required
        ></FormTextArea>
        <label htmlFor="rating">별점</label>
        <StarRating rating={review.rating} setRating={(rating) => setReview({ ...review, rating })} size={24} /> {/* 별점 크기를 24로 설정 */}
        <SubmitButton type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Submitting...' : '리뷰 제출'}
        </SubmitButton>
      </ReviewFormElement>
      <ReviewsComponent cafeId={id!} /> {/* ReviewsComponent 추가 */}
    </ReviewFormContainer>
  );
};

export default ReviewPage;
