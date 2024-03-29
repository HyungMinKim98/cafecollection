import React from 'react';
import styled from 'styled-components';

// Example data for cafes
const cafes = [
  { name: "Cafe 1", image: "/img/cafe1.jpg" },
  { name: "Cafe 2", image: "/img/cafe2.jpg" },
  { name: "Cafe 3", image: "/img/cafe3.jpg" },
  { name: "Cafe 3", image: "/img/cafe3.jpg" },
  { name: "Cafe 3", image: "/img/cafe3.jpg" },
  { name: "Cafe 3", image: "/img/cafe3.jpg" },
  { name: "Cafe 3", image: "/img/cafe3.jpg" },
  { name: "Cafe 3", image: "/img/cafe3.jpg" },
  // Add more cafes here
];

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
            <CafeItem key={index}>
              <img src={cafe.image} alt={cafe.name} />
              <p>{cafe.name}</p>
            </CafeItem>
          ))}
        </CafeList>
      </Section>

      {/* Other sections */}
    </Container>
  );
};

export default Mainpage;