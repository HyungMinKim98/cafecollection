//src > App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Mainpage from './pages/Mainpage/Mainpage';
import LoginPage from './pages/LoginPage/LoginPage';
import IDSearchPage from './pages/LoginPage/IDSearchPage';
import PasswordResetPage from './pages/LoginPage/PasswordResetPage';
import RegistrationPage from './pages/LoginPage/RegistrationPage';
import AboutPage from './pages/AboutPage/AboutPage';
import CafeDetailPage from './pages/DetailPage/CafeDetailPage'; // Import the cafe detail page component
import ImageUpload from './components/ImageUpload'; // Adjust the path as needed
import ReviewPage from './pages/ReviewPage/ReviewPage';
import UserPage from './pages/UserPage/UserPage';
import ProfileCompletionPage from './pages/ProfileCompletionPage/ProfileCompletionPage'; 
import './firebase'; // Firebase 초기화
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import useAuth from './useAuth';

const Layout = () => {
  return(
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
      <Footer />
    </>
  )
}
const App = () => {
  useAuth();
  return (
    <Router>
      <Routes>
        <Route path='/' element= {<Layout />}>
          <Route index element={<Mainpage />} />
          <Route path='login' element= {<LoginPage />} />
          <Route path='idsearch' element= {<IDSearchPage />} />
          <Route path='passwordreset' element= {<PasswordResetPage />} />
          <Route path='register' element= {<RegistrationPage />} />
          <Route path='about' element= {<AboutPage/>} />
          <Route path='user' element= {<UserPage/>} />
          <Route path="/profile-completion" element={<ProfileCompletionPage />} />
          <Route path='/cafes/:id/review/new' element={<ReviewPage />} />
          <Route path='/cafes/:id' element={<CafeDetailPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path='/some-path' element={<ImageUpload />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
