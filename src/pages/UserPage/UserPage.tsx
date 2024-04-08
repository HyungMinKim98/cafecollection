// src>pages>UserPage>UserPage.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Review, User } from '../../types/types';
import { Cafe } from '../../types/cafe';
import axios from 'axios'; // API 호출을 위해 axios 사용 가정
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase 인증 모듈 임포트

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // 에러 메시지 상태 관리
  const [nearbyCafes, setNearbyCafes] = useState<Cafe[]>([]); // 가까운 카페
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string>(''); // 선택된 지역


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/users/${user.uid}/region`);
          // response.data에 region 속성이 있다고 가정하고, 없으면 "지역 정보 없음"을 기본값으로 사용
          const regionFromResponse = response.data ? response.data.region : "지역 정보 없음";
          // userInfo를 업데이트할 때, 모든 필수 속성을 포함한 새 객체를 생성
            // 사용자 정보 업데이트
            const updatedUserInfo: User = {
              id: user.uid,
              name: user.displayName || "익명 사용자",
              email: user.email || "이메일 없음",
              region: regionFromResponse, // API 응답에서 받은 region 값 또는 기본값 사용
          };
          setUserInfo(updatedUserInfo);
        } catch (error) {
          console.error("사용자 정보 또는 지역 정보 가져오기 실패:", error);
          setError("정보를 가져오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      } else {
        // 사용자 로그아웃 처리
        setUserInfo(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const fetchUserDataAndReviews = async (user: User) => {
    setLoading(true);
    try {
      // 사용자 정보와 관련된 API 호출 로직
      // 예: 사용자 리뷰 가져오기
      const userReviewsResponse = await axios.get(`/api/reviews/user/${user.email}`);
      setUserReviews(userReviewsResponse.data);

      // 사용자 지역에 따른 카페 목록 가져오기 (지역 상태가 변경될 때마다 호출될 수 있도록 별도의 useEffect에서 처리할 수도 있습니다)
      if (selectedRegion) {
        const nearbyCafesResponse = await axios.get(`/api/cafes/nearby?region=${selectedRegion}`);
        setNearbyCafes(nearbyCafesResponse.data);
      }
    } catch (error) {
      console.error('데이터 로딩 중 오류 발생', error);
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
  
    // 사용자가 로그인한 상태라면 선택된 지역 정보를 서버에 업데이트
    if (userInfo && userInfo.id) {
      try {
        await axios.post(`/api/users/${userInfo.id}/updateRegion`, { region: selectedRegion });
        // 상태 업데이트 및 사용자에게 알림 표시 등의 추가 작업
      } catch (error) {
        console.error("지역 정보 업데이트 실패:", error);
        // 에러 처리
      }
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return (
      <div>
        <p>오류: {error}</p>
        <p>문제가 지속되면 고객 지원에 문의해주세요.</p>
      </div>
    );
  }
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

