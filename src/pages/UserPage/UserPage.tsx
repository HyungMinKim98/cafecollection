// src > pages> UserPage> UserPage.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../src/redux/store';
import { useAppSelector } from '../../redux/hooks'; // Correct import of typed hooks

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
    <div className="user-container">
      <div className="user-header">
        <h1>{user.name || 'User'}'s Profile</h1>
        <p>Manage your interests and profile information.</p>
      </div>
      <div className="profile-section">
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Region:</strong> {user.region || 'N/A'}</p>
        <button onClick={handleEditProfile}>Edit Profile</button>
      </div>
    </div>
  );
};

export default UserPage;