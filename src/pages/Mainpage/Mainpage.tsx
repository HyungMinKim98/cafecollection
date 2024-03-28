import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { SiNaver, SiKakao } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

// Styled components for different sections of the main page
const Container = styled.div`
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f9fa;
`;

const HeroSection = styled.div`
  background-image: url('/path-to-your-hero-image.jpg');
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
`;

const Section = styled.section`
  padding: 40px 20px;
`;

const Footer = styled.footer`
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px;
`;

const SnsButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

type SnsButtonProps = {
  bg: string;
  color?: string;
  children: ReactNode;
};

const SnsButton = ({ bg, color = '#fff', children }: SnsButtonProps) => (
  <button
    style={{
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: bg,
      color: color,
    }}
  >
    {children}
  </button>
);

// Main component
const Mainpage = () => {
  return (
    <Container>
      <Header>
        <div>Logo</div>
        <nav>
          <Link to="/cafes">Cafes</Link>
          <Link to="/about">About</Link>
        </nav>
      </Header>
      <HeroSection>
        <h1>Welcome to Our Cafe Collection</h1>
        <p>Discover your next favorite cafe with us.</p>
      </HeroSection>
      <Section>
        <h2>How It Works</h2>
        <p>Explore cafes, read reviews, and book your spot easily.</p>
      </Section>
      <Section>
        <h2>Featured Cafes</h2>
        {/* Implementation for featured cafes list */}
      </Section>
      <Section>
        <SnsButtonsContainer>
            <SnsButton bg="#ffffff"><FcGoogle /></SnsButton>
            <SnsButton bg="#3b5998" color="#fff"><FaFacebook /></SnsButton>
            <SnsButton bg="#2DB400" color="#fff"><SiNaver /></SnsButton>
            <SnsButton bg="#FEE500" color="#000"><SiKakao /></SnsButton>
           </SnsButtonsContainer>
         </Section>
         <Section>
           <h2>Categories</h2>
           <div>
             {/* Categories could be listed here */}
           </div>
         </Section>
         <Section>
           <h2>Testimonials</h2>
           <p>User reviews and experiences can be shared here.</p>
         </Section>
         <Footer>
           <p>Footer Content Here</p>
           <Link to="/contact">Contact Us</Link>
           <div>
             {/* Social Media Links */}
           </div>
         </Footer>
       </Container>
     );
   };
   
   export default Mainpage;