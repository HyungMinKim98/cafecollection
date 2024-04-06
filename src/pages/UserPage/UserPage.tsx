// src>pages>UserPage>UserPage.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Review, User } from '../../types/types';
import { Cafe } from '../../types/cafe';
import axios from 'axios'; // API 호출을 위해 axios 사용 가정

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Heading = styled.h2`
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;
const RegionSelect = styled.select`
  /* 스타일 정의 */
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const UserDetail = styled.p`
  font-size: 1.1rem;
  color: #666;
`;

const NoDataText = styled.p`
  color: #888;
`;

const UserPage = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Loading 상태 관리 (현재는 사용하지 않음)
  const [error, setError] = useState(''); // 에러 메시지 상태 관리
  const [nearbyCafes, setNearbyCafes] = useState<Cafe[]>([]); // 가까운 카페
  const [userReviews, setUserReviews] = useState<Review[]>([
    { id: '1', cafeId: 'cafe1', user: 'John Doe', comment: 'Great experience!', rating: 5 },
    { id: '2', cafeId: 'cafe2', user: 'John Doe', comment: 'Could be better.', rating: 3 },
  ]);
  const [selectedRegion, setSelectedRegion] = useState<string>(''); // 선택된 지역


  useEffect(() => {
    const fetchUserDataAndReviews = async () => {
      try {
        // 사용자 정보와 리뷰를 가져오는 API 호출 (가정)
        const userInfoResponse = await axios.get('/api/user/profile');
        const userReviewsResponse = await axios.get('/api/reviews/user');
        setUserInfo(userInfoResponse.data);
        setUserReviews(userReviewsResponse.data);

        // 선택된 지역에 따라 가까운 카페 목록을 가져오는 API 호출 (가정)
        if (userInfo?.region) {
          const nearbyCafesResponse = await axios.get(`/api/cafes/nearby?region=${selectedRegion}`);
          setNearbyCafes(nearbyCafesResponse.data);
        }
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생', error);
      }
    };

    fetchUserDataAndReviews();
  }, [selectedRegion]);

 
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <Container>
      <Section>
        <Heading>사용자 정보</Heading>
        <UserInfo>
          <UserDetail>이름: {userInfo?.name}</UserDetail>
          <UserDetail>이메일: {userInfo?.email}</UserDetail>
          <UserDetail>지역: {userInfo?.region}</UserDetail>
          <RegionSelect onChange={handleRegionChange} value={selectedRegion}>
            <option value="">지역 선택</option>
            {/* 지역 목록 동적으로 렌더링 */}
          </RegionSelect>
        </UserInfo>
      </Section>
      <Section>
        <Heading>내 리뷰</Heading>
        {userReviews.length > 0 ? (
          <List>
            {userReviews.map((review) => (
              <ListItem key={review.id}>{review.comment} - {review.rating} 별점</ListItem>
            ))}
          </List>
        ) : (
          <NoDataText>작성한 리뷰가 없습니다.</NoDataText>
        )}
      </Section>
      {/* 관심 카페 목록 섹션 (미래 기능 예시) */}
      {/* <Section>
        <Heading>관심 카페</Heading>
        <List>
          <ListItem>카페 이름 - 거리 정보</ListItem>
          {/* 더 많은 카페 목록... */}
      {/* </List>
      </Section> */}
    </Container>
  );
};


export default UserPage;

