// src > pages > MainPage > Mainpage.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Cafe } from '../../types/cafe';
import { Container, HeroSection, SectionTitle, CafeList, CafeItem, GlobalStyles } from './MainPageStyles'; // Import your styled components

const Section = styled.section`
  padding: 40px 20px;
`;

const HeroSectionStyled = styled.div`
  position: relative;
  height: 60vh;
  background: url('path-to-your-hero-image.jpg') no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }
  h1 {
    font-size: 3rem;
    z-index: 1;
  }
  p {
    font-size: 1.5rem;
    z-index: 1;
  }
`;

const DiscoverButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;
  &:hover {
    background-color: #0056b3;
  }
`;

const CafeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Mainpage = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCafes = async () => {
      const response = await fetch('http://localhost:5001/cafes');
      const data = await response.json();
      console.log(data); // 서버 응답 로그 출력
      setCafes(data);
    };

    fetchCafes();
  }, []);

  const handleCafeClick = (cafeId: string) => {
    navigate(`/cafes/${cafeId}`);
  };

  return (
    <Container>
      <HeroSectionStyled>
        <h1>Welcome to Our Cafe Collection </h1>
      </HeroSectionStyled>
      
      <Section>
        <h2>Cafes</h2>
        <CafeList>
          {cafes.map((cafe, index) => (
            <CafeItem key={index} onClick={() => handleCafeClick(cafe._id)}>
              <CafeImage src={`http://localhost:5001${cafe.photo}`} alt={cafe.name} />
              <p>{cafe.name}</p>
            </CafeItem>
          ))}
        </CafeList>
      </Section>
    </Container>
  );
};

export default Mainpage;