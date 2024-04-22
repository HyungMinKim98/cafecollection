// src/pages/UserPage/UserPageStyles.ts
import styled from 'styled-components';

export const UserContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: #333;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const ProfileSection = styled.div`
  margin-top: 20px;
`;

export const Info = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 10px;

  strong {
    font-weight: bold;
  }
`;

export const EditButton = styled.button`
  display: block;
  background-color: #0056b3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 20px auto;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004494;
  }
`;
