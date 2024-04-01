import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Cafe {
  _id: string; // Add this line
  name: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  address?: string;
  phone?: string;
  // Add more fields as necessary
}


const Container = styled.div`
  font-family: 'Arial', sans-serif;
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

const CafeList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 20px 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const CafeItem = styled.div`
  min-width: 220px;
  text-align: center;

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 8px;
  }
`;

const Mainpage = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCafes = async () => {
      const response = await fetch('http://localhost:5001/api/cafes');
      const data = await response.json();
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
              <img src={cafe.image} alt={cafe.name} />
              <p>{cafe.name}</p>
            </CafeItem>
          ))}
        </CafeList>
      </Section>

    </Container>
  );
};

export default Mainpage;