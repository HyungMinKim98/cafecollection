// src/pages/EditProfilePage/EditProfilePage.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../src/redux/store';
import { updateUserProfile } from '../../../src/redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';

const EditProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.user.userInfo);

  // Local state for form fields, initialized with user info from global state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [region, setRegion] = useState(user?.region || '');

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (user?.firebaseUid) {
      await dispatch(updateUserProfile({ firebaseUid: user.firebaseUid, name, email, region }));
      navigate('/user');
    } else {
      alert("Firebase UID is missing, cannot update profile.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="region">Region:</label>
          <input id="region" value={region} onChange={(e) => setRegion(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
