//src > pages> LoginPage>LoginPage.tsx
import '../../firebase'; // Firebase 초기화 먼저 임포트
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import React, { useState } from 'react';
import {
  LoginPageContainer,
  LoginFormContainer,
  LoginBox,
  FormGroup,
  FormControl,
  Button,
  SnsSignupButton,
  LoginFooter,
  IconGoogle,
  IconFacebook,
  IconNaver,
  IconKakao,
  SnsSignupButtonsContainer
} from './LoginPageStyles';

const LoginPage = () => {
  const navigate = useNavigate(); // 여기에서 useNavigate 훅 사용
  // 로그인 함수 정의
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("로그인 성공", result.user);
        navigate('/'); // 로그인 성공 후 메인 페이지로 리디렉션
      })
      .catch((error) => {
        console.error("로그인 실패", error);
      });
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password, rememberMe);
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginBox>
          <h3>Login</h3>
          <p>P2P 플랫폼 000입니다.</p>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <FormGroup>
              <label htmlFor="email">Email Address</label>
              <FormControl 
                id="email" 
                type="email" 
                placeholder="이메일" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            {/* Password */}
            <FormGroup>
              <label htmlFor="password">Password</label>
              <FormControl 
                id="password" 
                type="password" 
                placeholder="비밀번호" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            {/* Remember Me */}
            <div className="form-check">
              <input 
                id="rememberMe" 
                type="checkbox" 
                className="form-check-input" 
                checked={rememberMe} 
                onChange={() => setRememberMe(!rememberMe)} />
              <label className="form-check-label" htmlFor="rememberMe">아이디 저장</label>
            </div>
            {/* Submit Button */}
            <div className="form-group text-center">
              <Button type="submit" className="primary">Login</Button>
            </div>
            {/* SNS Signup Buttons */}
            <p>SNS계정으로 간편 로그인/회원가입</p>
            <SnsSignupButtonsContainer>
              <SnsSignupButton variant="google" onClick={loginWithGoogle}><IconGoogle /></SnsSignupButton>
              <SnsSignupButton variant="facebook"><IconFacebook /></SnsSignupButton>
              <SnsSignupButton variant="naver"><IconNaver /></SnsSignupButton>
              <SnsSignupButton variant="kakao"><IconKakao /></SnsSignupButton>
            </SnsSignupButtonsContainer>
            {/* Footer Links */}
            <LoginFooter>
              <a href="idsearch">아이디 찾기</a> | <a href="passwordreset">비밀번호 찾기</a>| <a href="register">회원가입</a>
            </LoginFooter>
          </form>
          </LoginBox>
        </LoginFormContainer>
      </LoginPageContainer>
  );
};

export default LoginPage;