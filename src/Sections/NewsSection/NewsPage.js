import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './NewsPage.css';
import NewsCardSet from '../../components/NewsCardSet';

const animateGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HomeSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 0 5%;
  background: linear-gradient(270deg,rgb(65, 10, 105), #000000);
  background-size: 400% 400%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  animation: ${animateGradient} 8s ease infinite;
  transition: background-position 0.2s ease;
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 48em) {
    margin: 20px auto;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem 9rem; /* Set vertical gap to 0rem */
  margin-top: 5rem;
  width: 90%;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 1rem;
    margin-top: 0rem;
    margin-left: -10rem;
    width: 100%;
    justify-items: center;
  }

  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0rem 1rem;
    margin-top: -5rem;
    margin-left: -4.5rem;
    width: 100%;
    justify-items: center;
  }
`;

const Title = styled.h1`
  line-height: 1.2;
  padding: 0.5rem 0;
  font-size: calc(2rem + 1.5vw);
  color: white;

  @media only screen and (max-width: 48em) {
    font-size: calc(1.5rem + 1vw);
  }
`;

 

const NewsPage = () => {
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
  const [NewsData, setNewsData] = useState([]);

  useEffect(() => {
    getNewsData();

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setGradientPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  async function getNewsData() {
    let data = await fetch(
      'https://server.markethealers.com/MarketHealers/getNewsData'
    );
    data = await data.json();
    setNewsData(Object.values(data.data.data));
  }

  let index = 1;
 
  return (
    <HomeSection
      style={{
        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%,rgb(34, 4, 55), #000000)`,
        backgroundSize: '300% 300%',
      }}>
      <MainContent>
        <Title>Market Healers News</Title>

        <NewsGrid>
          {Object.entries(NewsData).map(([key, value]) => {
            return (
              <NewsCardSet
                key={index++}
                data={{ topic: value.topic, news: value.data }}
              />
            );
          })}
        </NewsGrid>
      </MainContent>
    </HomeSection>
  );
};

export default NewsPage;
