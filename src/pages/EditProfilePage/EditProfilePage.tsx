// src/pages/EditProfilePage/EditProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../src/redux/store';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import { updateUserProfile } from '../../redux/userSlice';

const EditProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();  // Using the typed dispatch
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userInfo); // Access user info from Redux store

  // 상태 초기화
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [region, setRegion] = useState(user?.region ?? '');
  
  // 유저 정보가 변경될 때마다 폼 상태 업데이트
  useEffect(() => {
    setName(user ? user.name : '');
    setEmail(user ? user.email : '');
    setRegion(user ? user.region : '');
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Ensure that firebaseUid is available
    if (!user?.firebaseUid) {
      console.error("No Firebase UID found. User is not logged in.");
      return;
    }
    try {
      const resultAction = await dispatch(updateUserProfile({
        firebaseUid: user.firebaseUid, // Provide the firebaseUid here
        name, 
        email, 
        region
      })).unwrap();
      console.log("Profile updated successfully", resultAction);
      navigate('/user');
    } catch (err:any) {
      console.error("Failed to update profile", err);
      alert(`Error: ${err.message || 'Unknown error'}`);
    }
  };


  return (
    <div className="edit-profile-container">
      <h1>Edit Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Region" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

  export default EditProfilePage;