import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  RegistrationPageContainer,
  SnsButtonsContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
  EmailVerifyButton,
  LoginRedirect,
  StyledLink,
  IconGoogle,
  IconFacebook,
  IconNaver,
  IconKakao,
} from './RegistrationPageStyles';

import { SnsSignupButton } from './LoginPageStyles';
const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log('Form Submitted', formData);
  };

  return (
    <RegistrationPageContainer>
      <h2>Membership Registration</h2>
      <SnsButtonsContainer>
          <SnsSignupButton variant="google"><IconGoogle /></SnsSignupButton>
          <SnsSignupButton variant="facebook"><IconFacebook /></SnsSignupButton>
          <SnsSignupButton variant="naver"><IconNaver /></SnsSignupButton>
          <SnsSignupButton variant="kakao"><IconKakao /></SnsSignupButton>
      </SnsButtonsContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <EmailVerifyButton type="button">Email Verification</EmailVerifyButton>

        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="confirmPassword">Confirm Password:</FormLabel>
          <FormInput type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="nickname">Nickname:</FormLabel>
          <FormInput type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} required />
        </FormGroup>
        <FormButton type="submit">Register</FormButton>
        <LoginRedirect>
          Already have an account? <StyledLink to="/login">Log in</StyledLink>
        </LoginRedirect>
      </form>
    </RegistrationPageContainer>
  );
};

export default RegistrationPage;