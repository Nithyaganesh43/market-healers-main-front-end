import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MarketValueCardSet from '../../components/MarketValueCardSet';
import {
  getLastMarketClosedDateAndTime,
  fetchMarketValueData,
} from '../../Helper/MarketPageHelper';
import Load from '../../Loader/Load';
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

const NoDataMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: rgb(200, 50, 50);
  margin-top: 2rem;
`;
const setIntervalForFetch = (min, ind, setIsLoading,setMarketValueData) => {
  localStorage.setItem('index', ind);
  setInterval(() => {
    fetchMarketValueData(setIsLoading, setMarketValueData);
  }, min * 60 * 1000);
}; 
const MarketPage = () => {
  const [marketValueData, setMarketValueData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataInit();
  }, []);

  async function fetchDataInit() {
    let index = await fetchMarketValueData(setIsLoading, setMarketValueData);
    
//if the request is made perfectly on 15min after the last updated time new request need to be made
//and so on after 15min data updated perolery 
    if (index >= 15) {
      await fetchMarketValueData(setIsLoading, setMarketValueData);
      let ind = 0;
      setIntervalForFetch(15, ind, setIsLoading, setMarketValueData);
    } 
    //in this case request to server made just after the server updated the data 
    //so intervaly we can request 
    else if (index == 0) {  
      setIntervalForFetch(15, index,setIsLoading, setMarketValueData);
    }
//if the request is made inbetween then initialy we need to skip the index 
//which is already time gone so we have >15 <0 elements to display initialy 
//after that few we can continue with interval
     else if (index < 15 && index > 0) {
      localStorage.setItem('index', index);
      setTimeout(async() => {
       await fetchMarketValueData(setIsLoading, setMarketValueData);
        setInterval(() => {
          fetchMarketValueData(setIsLoading, setMarketValueData);
        }, 15 * 60 * 1000);
      }, (15 - index) * 60 * 1000);
    } else { 
       setIntervalForFetch(15,0); 
    }
  }

  return (
    <HomeSection>
      <MainContent>
        {isLoading ? '' : <Title>Market Healers Market Value</Title>}

        <SubText>
          {isLoading
            ? ''
            : marketValueData?.isMarketOpen
            ? 'Market is open. Check current values here.'
            : `The market is currently closed. Please visit us again when it reopens. Last closed on ${
                getLastMarketClosedDateAndTime(marketValueData) || '--'
              }`}
        </SubText>

        {isLoading ? (
          <Load />
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
