import React, { useState, useEffect } from 'react';
import styled from 'styled-components';  
import NewsCard from '../../components/NewsCard/NewsCard';
import {getNewsData} from '../../Helper/LoadNewsData'; 
import { useContext } from 'react';
import { LoadingContext } from '../../Context/LoadingContext';

const HomeSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 0 5%;
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
    margin: auto;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0rem 8rem;  
  margin-top: 5rem;
  width: 90%;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: -50vw;
    margin-left: -35vw;
  }

  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    margin-top: -70vw;
    padding: 0;
    margin-bottom: 10rem;
    margin-left: -36vw;
  }
`;

const Title = styled.h1`
  line-height: 1.2;
  padding: 0.5rem 0;
  font-size: calc(2rem + 1.5vw);
  color: white;

  @media only screen and (max-width: 48em) {
    font-size: calc(1rem + 1vw);
  }
`;
 

const NewsPage = () => {
  const [NewsData, setNewsData] = useState([]);
  
  const {   setloading } = useContext(LoadingContext);
  
  useEffect(() => {
    const fetchData = async () => {
      await getNewsData(setNewsData, setloading);
    };
    fetchData();
  }, []);
 

  
  return (
    <HomeSection>
      <MainContent>
        <Title>Market Healers News</Title>

        <NewsGrid>
          {Object.values(NewsData).map((value, key) => {
            if(value[0]){
              {
              return  Object.entries(value[0]).map(([ky, val]) => {
                  
                  return (
                    <NewsCard
                      key={ky}
                      data={{
                        content: val.content,
                        description: val.description,
                        image: val.image,
                        publishedAt: val.publishedAt,
                        source: val.source,
                        title: val.title,
                        url: val.url,
                      }}
                    />
                  );
                });
              }
            }
            
          })}
        </NewsGrid>
      </MainContent>
    </HomeSection>
  );
};

export default NewsPage;
