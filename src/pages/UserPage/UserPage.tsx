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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // 에러 메시지 상태 관리
  const [nearbyCafes, setNearbyCafes] = useState<Cafe[]>([]); // 가까운 카페
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string>(''); // 선택된 지역


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(firebaseUser);
      if (firebaseUser) {
        try {
          const { uid } = firebaseUser;
          console.log(`Requesting region for UID: ${uid}`);
          const response = await axios.get(`http://localhost:5001/users/${uid}/region`);
          setUser(response.data as User);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  

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
      {user ? (
        <div>
          <h2>User Information</h2>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Region: {user?.region || 'No region set'}</p>
        </div>
      ) : (
        <p>No user information available. Please log in.</p>
      )}
    </Container>
  );
};

export default UserPage;
