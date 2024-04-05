// src>pages>DetailPage>CafeDetailPageStyles.ts

import styled from 'styled-components';

// 기본 컨테이너
export const CafeContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 카페 헤더
export const CafeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
`;

// 카페 이름
export const CafeName = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: #333;
`;

// 평점
export const Rating = styled.span`
  background-color: #ffd700; // 금색으로 변경
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
`;

// 주소 및 전화번호
export const Address = styled.p`
  color: #666;
  font-size: 1.2rem;
`;

export const Phone = styled.p`
  color: #666;
  font-size: 1.2rem;
`;

// 이미지 스타일링
export const CafeImage = styled.img`
  max-width: 100%;
  width: 800px;
  height: auto;
  border-radius: 10px;
  margin: 20px 0;
`;

// 설명
export const Description = styled.p`
  line-height: 1.6;
  font-size: 18px;
  color: #666;
  margin: 25px 0;
`;

// 운영시간
export const OperatingHours = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5; // A light background to stand out
  border-left: 4px solid #ff9900; // Accent color to draw attention
  font-size: 1rem;
  line-height: 1.5;
`;

// 매뉴
export const MenuSlider = styled.div`
  .slick-slide {
    padding: 10px; // Add space between slides
  }
`;

// 메뉴 섹션
export const Menu = styled.div`
  margin: 20px 0;
  background-color: #f9f9f9; // 배경색 변경
  padding: 15px;
  border-radius: 8px;
`;

export const MenuItem = styled.div`
  margin: 10px 0;
  font-size: 1.1rem;
  color: #333;
`;

// 리뷰 아이템 스타일 조정
export const ReviewItem = styled.div`
  border-bottom: 1px solid #ddd; // 리스트 아이템 사이의 구분선
  padding: 15px;
  &:last-child {
    border-bottom: none; // 마지막 아이템은 구분선 제거
  }
`;

// 리뷰 섹션에 대한 스타일
export const ReviewSection = styled.section`
  margin-top: 40px;
`;

// 리뷰 작성 버튼 스타일
export const WriteReviewButton = styled.button`
  background-color: #4CAF50; // 녹색 배경
  color: white;
  padding: 10px 20px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
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
export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; // Circle shape
  margin-right: 15px;
  border: 2px solid #ddd; // A light border around the image
`;

export const StarContainer = styled.div`
  display: flex;
  align-items: center;
  
  .star {
    color: #ffcc00; // Gold color for stars
    margin-right: 5px;
  }
`;

// Ensure you import and use these styled components in your CafeDetailPage component
