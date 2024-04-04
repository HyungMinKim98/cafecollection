/* GlobalStyles.ts */
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #f4f4f4;
  }
`;

/* Container.ts */
export const Container = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 20px;
`;

/* HeroSection.ts */
export const HeroSection = styled.div`
  background-image: url('/path-to-your-hero-image.jpg'); /* Replace with actual image path */
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`;

/* SectionTitle.ts */
export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

/* CafeList.ts */
export const CafeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

/* CafeItem.ts */
export const CafeItem = styled.div`
  width: 300px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  p {
    font-size: 1.2rem;
    text-align: center;
    padding: 10px 5px;
    margin: 0;
    background-color: white;
  }
`;
