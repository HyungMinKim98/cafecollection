import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Cafe } from '../../types/cafe';
import { Container, HeroSection, SectionTitle, CafeList, CafeItem, GlobalStyles } from './styledComponents'; // Import your styled components

const Section = styled.section`
  padding: 40px 20px;
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
      <HeroSection>
        <h1>Welcome to Our Cafe Collection</h1>
        <p>Discover your next favorite cafe with us.</p>
      </HeroSection>
      
      <Section>
        <h2>Featured Cafes</h2>
        <CafeList>
          {cafes.map((cafe, index) => (
            <CafeItem key={index} onClick={() => handleCafeClick(cafe._id)}>
              <img src={`http://localhost:5001${cafe.photo}`} alt={cafe.name} />              
              <p>{cafe.name}</p>
            </CafeItem>
          ))}
        </CafeList>
      </Section>

    </Container>
  );
};

export default Mainpage;