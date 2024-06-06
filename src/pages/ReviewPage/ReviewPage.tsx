//src >pages> ReviewPage>ReviewPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Cafe } from '../../types/cafe';
import ReviewForm from '../DetailPage/ReviewForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

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

const ReviewPage: React.FC = () => {
  const [cafeName, setCafeName] = useState(''); // 카페 이름을 위한 상태 추가
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

  return (
    <ReviewFormContainer>
      <h2>리뷰 작성</h2>
      <CafeNameDisplay>{cafeName}</CafeNameDisplay>
      {id && <ReviewForm cafeId={id} />}
    </ReviewFormContainer>
  );
};

export default ReviewPage;