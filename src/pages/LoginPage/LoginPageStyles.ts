import styled from 'styled-components';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from 'react-icons/ri';

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center; // Center the buttons horizontally
  gap: 10px; // Add some space between buttons
  margin-top: 20px;
`;

export const LoginFormContainer = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const FormControl = styled.input.attrs(props => ({
  // If you have specific HTML attributes you want to infer from props
}))`
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px 15px;
  width: 100%;
  background-color: #f0f0f0;
  &:focus {
    background-color: #fff;
  }
`;

export const Button = styled.button.attrs(props => ({
  // Useful if you need to pass attributes like 'type' based on props
}))`
  border-radius: 20px;
  padding: 10px 15px;
  width: 100%;
  margin: 10px 0;
  font-size: 16px;
  transition: 0.3s;
  border: none;
  cursor: pointer;

  &.primary {
    background-color: #4a90e2;
    color: #fff;
    &:hover {
      background-color: #5aa1f2;
    }
  }

  // Here you can define more button types based on className
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

export const LoginFooter = styled.div`
  margin-top: 20px;
  text-align: center;

  a {
    color: #000; 
    text-decoration: none; // Remove underline

    &:hover {
      text-decoration: underline; // Add underline on hover
    }
  }
`;