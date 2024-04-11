// src/pages/EditProfilePage/EditProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../src/redux/store';
import { fetchUserProfile, updateUserProfile } from '../../../src/redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';

const EditProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.userInfo);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [region, setRegion] = useState(user?.region || '');

  useEffect(() => {
    if (user && user.firebaseUid) {
      dispatch(fetchUserProfile(user.firebaseUid));
    }
  }, [dispatch, user?.firebaseUid]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent default form submission
    if (user?.firebaseUid) {
      await dispatch(updateUserProfile({ firebaseUid: user.firebaseUid, name, email, region }));
      navigate('/user'); // Navigate to the user profile page after update
    } else {
      console.error("Firebase UID is missing, unable to update profile.");
    }
  };
  

    return (
      <div className="edit-profile-container">
        <h1>Edit Your Profile</h1>
        <form onSubmit={handleSave}>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="region">Region:</label>
          <input id="region" type="text" value={region} onChange={(e) => setRegion(e.target.value)} />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  };

  export default EditProfilePage;