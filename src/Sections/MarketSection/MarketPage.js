import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MarketValueCardSet from '../../components/MarketValueCardSet';

const HomeSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 2rem 5%;
  background: linear-gradient(270deg, rgb(65, 10, 105), #000000);
  background-size: 400% 400%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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

const MarketValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 2rem auto;
  width: 100%;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
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

const SubText = styled.h5`
  color: rgb(207, 207, 207);
  font-size: calc(1.2rem + 0.5vw);
  margin-top: 20px;
  margin-bottom: 20px;
  @media only screen and (max-width: 48em) {
    font-size: calc(1rem + 0.5vw);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: white;
  margin-top: 2rem;
`;

const NoDataMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: rgb(200, 50, 50);
  margin-top: 2rem;
`;

const MarketPage = () => {
  const [marketValueData, setMarketValueData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
const convertToIST = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { timeZone: 'Asia/Kolkata' };
  const istDate = new Date(date.toLocaleString('en-US', options));

  const day = istDate.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';
  const month = istDate.toLocaleString('en-US', {
    month: 'long',
    timeZone: 'Asia/Kolkata',
  });
  const year = istDate.getFullYear();
  const hours = istDate.getHours();
  const minutes = String(istDate.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${day}${suffix} ${month} ${year} at ${hour12}:${minutes} ${period}`;
};


  useEffect(() => {
    fetchMarketValueData();
    const intervalId = setInterval(() => {
      fetchMarketValueData();
    }, 900000);

    return () => clearInterval(intervalId);
  }, []);

  async function fetchMarketValueData() {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://server.markethealers.com/markethealers/getMarketdata'
      );
      if (!response.ok) throw new Error('Failed to fetch market data');
      const data = await response.json();
      setMarketValueData(data?.data || {});
    } catch (error) {
      console.error('Error fetching market data:', error.message);
      setMarketValueData({ error: 'Something Went Wrong' });
    } finally {
      setIsLoading(false);
    }
  }  
   
function getLastMarketClosedDateAndTime() {
  if (!marketValueData?.data?.[0]?.values?.timestamp?.length) {
    return 'Unavailable';
  }
  return convertToIST(
    marketValueData.data[0].values.timestamp[
      marketValueData.data[0].values.timestamp.length - 1
    ]
  );
}

  return (
    <HomeSection>
      <MainContent>
        <Title>Market Healers Market Value</Title>
         
        <SubText>
          {marketValueData?.isMarketOpen
            ? 'Market is open. Check current values here.'
            : `The market is currently closed. Please visit us again when it reopens. Last closed on ${getLastMarketClosedDateAndTime()}`}
        </SubText>

        {isLoading ? (
          <LoadingMessage>Loading market data...</LoadingMessage>
        ) : marketValueData?.data &&
          Object.keys(marketValueData.data).length > 0 ? (
          <MarketValueGrid>
            {Object.entries(marketValueData.data).map(([key, value]) => (
              <MarketValueCardSet
                key={key}
                value={{ value, Market: marketValueData.isMarketOpen }}
              />
            ))}
          </MarketValueGrid>
        ) : (
          <NoDataMessage>
            {marketValueData.error ||
              'No market data available at the moment. Please check back later.'}
          </NoDataMessage>
        )}
      </MainContent>
    </HomeSection>
  );
};

export default MarketPage;
