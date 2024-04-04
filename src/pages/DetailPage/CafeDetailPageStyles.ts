// src>pages>DetailPage>CafeDetailPageStyles.ts

import styled from 'styled-components';

export const CafeContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CafeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
`;

export const CafeName = styled.h1`
  font-size: 3rem;
  margin: 0;
  color: #333;
`;

export const Rating = styled.span`
  background-color: #ffdd57;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
`;

export const Address = styled.p`
  color: #666;
  font-size: 1.2rem;
`;

export const Phone = styled.p`
  color: #666;
  font-size: 1.2rem;
`;

export const CafeImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Description = styled.p`
  line-height: 1.6;
  color: #666;
  margin: 20px 0;
`;

export const Menu = styled.div`
  margin: 20px 0;
`;

export const MenuItem = styled.div`
  margin: 10px 0;
  font-size: 1.1rem;
  color: #333;
`;

// Reuse this for each styled review component as necessary
export const ReviewItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  background-color: #f9f9f9;
`;

export const ReviewUserName = styled.h4`
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const ReviewText = styled.p`
  color: #666;
`;

export const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

// Ensure you import and use these styled components in your CafeDetailPage component
