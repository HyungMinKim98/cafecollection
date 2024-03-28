import React, { useState } from 'react';
import './PasswordResetPage.css'
const PasswordResetPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to handle password reset request
    console.log('Password reset requested for email:', email);
    // This would usually trigger sending a reset link or code to the user's email
  };

  return (
    <div className="password-reset-page">
      <h2>Password Reset</h2>
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
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
};

export default PasswordResetPage;