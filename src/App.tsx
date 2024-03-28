import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Mainpage from './pages/Mainpage/Mainpage';
import LoginPage from './pages/LoginPage/LoginPage';
import IDSearchPage from './pages/LoginPage/IDSearchPage';
import PasswordResetPage from './pages/LoginPage/PasswordResetPage';
import RegistrationPage from './pages/LoginPage/RegistrationPage';
import AboutPage from './pages/AboutPage/AboutPage';

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
  

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
