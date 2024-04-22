// src > pages> UserPage> UserPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용
import { useAppSelector } from '../../redux/hooks'; // Correct import of typed hooks
import { UserContainer, Header, Title, Subtitle, ProfileSection, Info, EditButton } from './UserPageStyles';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userInfo);  // Use typed selector here

  if (!user) {
    navigate('/login');
    return null;  // Don't render if there's no user data
  }

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

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