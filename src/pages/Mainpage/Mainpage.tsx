import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Cafe {
  _id: string;
  name: string;
  photo: string; // 변경된 필드
  rating?: number;
  reviewsCount?: number;
  address?: string;
  phone?: string;
  features: string[];
  businessHours: string[];
  menuItems: {
    name: string;
    price: number;
  }[];
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
    height: 200px; /* 이미지 높이를 고정값으로 설정 */
    width: 100%; /* 컨테이너 너비에 맞춤 */
    object-fit: cover; /* 이미지가 컨테이너 영역에 맞게 조정되도록 설정 */
    border-radius: 10px; /* 필요한 경우, 이미지의 모서리를 둥글게 */
    margin-bottom: 8px; /* 이미지와 텍스트 사이의 여백 설정 */
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