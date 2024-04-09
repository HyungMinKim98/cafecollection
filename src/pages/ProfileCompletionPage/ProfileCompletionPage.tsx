// src/pages/ProfileCompletionPage/ProfileCompletionPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCompletionPage = () => {
  const [nickname, setNickname] = useState('');
  const [region, setRegion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here, you would normally send the data to the backend
    console.log({ nickname, region });
    navigate('/'); // Redirect to home page or wherever appropriate
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Region:</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} required>
            <option value="">Select your region</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            // Add other options
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileCompletionPage;