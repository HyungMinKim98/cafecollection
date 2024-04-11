// src > pages> UserPage> UserPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../src/redux/store';

const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assuming the user slice contains a user object with basic profile info
  const user = useSelector((state: RootState) => state.user.userInfo);

  // Function to navigate to the profile editing page
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <h1>{user?.name || 'User'}'s Profile</h1>
        <p>Manage your interests and profile information.</p>
      </div>

      <div className="profile-section">
        <h2 className="profile-title">Profile Information</h2>
        <div className="profile-info">
          <div className="user-info">
            <p><strong>이름:</strong> {user?.name}</p>
            <p><strong>이메일:</strong> {user?.email}</p>
            <p><strong>지역:</strong> {user?.region}</p>
            <button onClick={handleEditProfile} className="edit-button">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
