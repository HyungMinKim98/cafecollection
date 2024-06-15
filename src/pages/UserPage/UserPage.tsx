// src > pages> UserPage> UserPage.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용
import { useAppSelector, useAppDispatch } from '../../redux/hooks'; 
import { fetchUserProfile } from '../../redux/userSlice'; // fetchUserProfile를 import
import { UserContainer, Header, Title, Subtitle, ProfileSection, Info, EditButton } from './UserPageStyles';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userInfo);  // Use typed selector here
  const userStatus = useAppSelector((state) => state.user.status); // User status 가져오기

  useEffect(() => {
    if (!user) {
      console.log("No user found, redirecting to login"); // 사용자 정보가 없는 경우 로그 출력
      navigate('/login');
    } else if (userStatus === 'idle') { // 프로필을 아직 가져오지 않은 경우에만 fetchUserProfile 실행
      console.log("User found, fetching profile"); // 사용자 정보가 있는 경우 로그 출력
      dispatch(fetchUserProfile()); // 사용자 프로필 데이터를 가져옵니다.
    }
  }, [dispatch, navigate, user, userStatus]);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  if (!user) {
    return null; // user가 null인 경우 렌더링하지 않음
  }

  console.log("Rendering UserPage with user:", user); // 렌더링 시 사용자 정보 출력

  return (
    <UserContainer>
      <Header>
        <Title>{user.name || 'User'}님의 프로필</Title>
        <Subtitle>Manage your interests and profile information.</Subtitle>
      </Header>
      <ProfileSection>
        <Info><strong>이름:</strong> {user.name || 'N/A'}</Info>
        <Info><strong>이메일:</strong> {user.email || 'N/A'}</Info>
        <Info><strong>지역:</strong> {user.region || 'N/A'}</Info>
        <EditButton onClick={handleEditProfile}>프로필 수정</EditButton>
      </ProfileSection>
    </UserContainer>
  );
};

export default UserPage;