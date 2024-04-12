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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const user = useAppSelector((state) => state.user.userInfo); // Access user info from Redux store


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
    } catch (err) {
      console.error("Failed to update profile", err);
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