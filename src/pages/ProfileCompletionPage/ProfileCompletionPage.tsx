// src/pages/ProfileCompletionPage/ProfileCompletionPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/userSlice'; // 액션 크리에이터의 경로를 확인하세요.
import { getAuth } from "firebase/auth";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const ProfileCompletionPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.userInfo); // 올바른 위치에서 훅 호출

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 사용자 정보가 Redux 상태에 이미 있어야 함을 가정
    if (user && user.firebaseUid) {
      try {
        const resultAction = await dispatch(updateUserProfile({
          firebaseUid: user.firebaseUid, // firebaseUid를 포함
          name, email, region
        })).unwrap();
        console.log("Profile updated successfully", resultAction);
        navigate('/user');
      } catch (err) {
        console.error("Failed to update profile", err);
      }
    } else {
      console.error("No user information available");
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>지역:</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileCompletionPage;
