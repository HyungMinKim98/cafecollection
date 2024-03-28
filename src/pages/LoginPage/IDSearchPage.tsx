import React, { useState } from 'react';
import './IDSearchPage.css'; 

const IDSearchPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Assuming you have an API endpoint for ID search
    const apiEndpoint = '/api/id-search';
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Please check your email for your ID.');
      } else {
        alert(data.message); // "No account found with that email" or other messages
      }
    } catch (error) {
      console.error('Error during ID search:', error);
      alert('There was an issue with your request. Please try again later.');
    }
  };

  return (
    <div className="id-search-page">
      <h2>Find Your ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Search ID</button>
      </form>
    </div>
  );
};

export default IDSearchPage;