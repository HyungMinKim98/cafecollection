import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export interface Cafe {
  _id: string; // Add this line
  name: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  address?: string;
  phone: string;
  features: string[];
  businessHours: string[];
  menuItems: {
    name: string;
    price: number;
  }[];
}

interface CafeDetailProps {
  cafe: Cafe | null;
}

const CafeContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const CafeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const CafeName = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const Rating = styled.span`
  background-color: #ffdd57;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const Address = styled.p`
  color: #666;
`;

const Phone = styled.p`
  color: #666;
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
`;

const Feature = styled.span`
  background-color: #eee;
  border-radius: 15px;
  padding: 5px 15px;
  font-size: 0.8rem;
`;

const BusinessHours = styled.div`
  margin-bottom: 20px;
`;

const Menu = styled.div`
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
`;

const CafeDetailPage = () => {
  const { id } = useParams();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    const fetchCafeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/cafes/${id}`);
        if (!response.ok) throw new Error('Cafe not found');
        const data = await response.json();
        setCafe(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCafeDetails();
  }, [id]);

  if (loading) return <div>Loading cafe details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cafe) return <div>Cafe not found.</div>;

  return (
    <CafeContainer>
      <CafeHeader>
        <CafeName>{cafe.name}</CafeName>
        <Rating>{cafe.rating} ({cafe.reviewsCount} reviews)</Rating>
        <Address>{cafe.address}</Address>
        <Phone>{cafe.phone}</Phone>
      </CafeHeader>

      <Features>
        {cafe.features.map((feature, index) => (
          <Feature key={index}>{feature}</Feature>
        ))}
      </Features>

      <BusinessHours>
        <h3>Business Hours</h3>
        {cafe.businessHours.map((hours, index) => (
          <p key={index}>{hours}</p>
        ))}
      </BusinessHours>

      <Menu>
        <h3>Menu Information</h3>
        {cafe.menuItems.map((menuItem, index) => (
          <MenuItem key={index}>{menuItem.name} - {menuItem.price}원</MenuItem>
        ))}
      </Menu>
    </CafeContainer>
  );
};

export default CafeDetailPage;