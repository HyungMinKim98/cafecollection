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

    // 이 부분 삭제
    // const firebaseUid = 'your_firebase_uid';

    if (firebaseUid) {
      // 백엔드에 프로필 정보 업데이트 요청을 보냅니다.
      await dispatch(updateUserProfile({ firebaseUid, name, email, region }));
      navigate('/user'); // 프로필 업데이트 후 유저 페이지로 리다이렉트
    } else {
      console.error("No Firebase UID found. User is not logged in.");
      // 사용자가 로그인하지 않은 상태를 처리하는 로직
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
