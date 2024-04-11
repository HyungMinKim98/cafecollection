// src/pages/ProfileCompletionPage/ProfileCompletionPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/userSlice'; // 액션 크리에이터의 경로를 확인하세요.
import { getAuth } from "firebase/auth";
import { useAppDispatch } from '../../redux/hooks';

const ProfileCompletionPage = () => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const firebaseUid = user ? user.uid : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firebaseUid) {
      await dispatch(updateUserProfile({ firebaseUid, name, email, region }));
      navigate('/user'); // navigate after update
    } else {
      console.error("No Firebase UID found. User is not logged in.");
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
