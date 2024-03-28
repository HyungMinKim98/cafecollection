import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

export const RegistrationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  margin: 50px auto;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const SnsButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const buttonStyle = `
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const SnsSignupButtonsContainer = styled.div`
  display: flex;
  justify-content: center; // Center the buttons horizontally
  gap: 10px; // Add some space between buttons
  margin-top: 20px;
`;

export const SnsSignupButton = styled.button<{ variant: 'google' | 'facebook' | 'naver' | 'kakao' }>`
  margin: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%; // Make it circular
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  font-size: 24px;

  
  background-color: ${props => {
    switch (props.variant) {
      case 'google':
        return '#ffffff';
      case 'facebook':
        return '#2d4373';
      case 'naver':
        return '#2DB400';
      case 'kakao':
        return '#FEE500';
      default:
        return '#ffffff';
    }
  }};

  &:hover {
    opacity: 0.9;
    filter: brightness(85%);

  }
`;
export const IconGoogle = styled(FcGoogle)`
  font-size: 24px;
  :hover { 
    color:#898686
  }
`;

export const IconFacebook = styled(FaFacebook)`
  font-size: 24px;
`;

export const IconNaver = styled(SiNaver)`
  font-size: 24px;
`;

export const IconKakao = styled(RiKakaoTalkFill)`
  font-size: 24px;
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  display: block;
  color: #666;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #4a90e2;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #367abf;
  }
`;

export const EmailVerifyButton = styled(FormButton)`
  background-color: #8b949e;
  margin-top: 10px;
  &:hover {
    background-color: #6e7681;
  }
`;

export const LoginRedirect = styled.div`
  margin-top: 20px;
`;

export const StyledLink = styled(Link)`
  color: #58a6ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;