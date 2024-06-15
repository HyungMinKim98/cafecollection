//src > pages> LoginPage>LoginPage.tsx
import '../../firebase'; // Firebase 초기화 먼저 임포트
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

const checkUserProfile = async (uid: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:5001/api/users/${uid}`);
    if (!response.ok) throw new Error('Failed to fetch profile status');
    
    const data = await response.json();
    console.log("Profile data received:", data);  // 데이터 확인을 위한 로그

    const needsCompletion = !data.region;  // region 정보가 없다면 프로필 완성이 필요함
    if (needsCompletion) {
      console.log("Profile needs completion.");
    } else {
      console.log("Profile is complete.");
    }
    return needsCompletion;
  } catch (error) {
    console.error('Error checking user profile:', error);
    return true;  // 오류 발생시 프로필 완성 가정
  }
};

const LoginPage = () => {
  const navigate = useNavigate(); // 여기에서 useNavigate 훅 사용
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // 에러 상태 초기화

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.'); // 이메일과 비밀번호가 입력되지 않은 경우 에러 메시지 설정
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const needsCompletion = await checkUserProfile(user.uid);
      if (needsCompletion) {
        navigate('/profile-completion'); // Change to your actual route
      } else {
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message); // 에러 메시지 설정
      console.error("Login failed:", error); // 디버깅 로그 추가
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const needsCompletion = await checkUserProfile(user.uid);
      if (needsCompletion) {
        navigate('/profile-completion'); // Change to your actual route
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Google login failed:", error); // Google 로그인 실패 디버깅 로그 추가
      setError('Google 로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginBox>
          <h3>Login</h3>
          <p>P2P 플랫폼 000입니다.</p>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
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