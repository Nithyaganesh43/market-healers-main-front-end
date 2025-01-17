import React, { useState, useEffect } from 'react';
import styled  from 'styled-components';
 
import NewsCardSet from '../../components/NewsCardSet';
 
const HomeSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 0 5%;
  background: linear-gradient(270deg,rgb(65, 10, 105), #000000);
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
    margin: auto ;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem 9rem; /* Set vertical gap to 0rem */
  margin-top: 5rem;
  width: 90%;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
margin-top: -40vh;
    margin-left: -35vw;
  }
  

  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    margin-top: -5vh;
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

  useEffect(() => {
    getNewsData(); 
  },[]);
function isThisToday(dateStr) {
  let today = new Date();
  let date = new Date(dateStr.split('-').reverse().join('-'));
  return today.toDateString() === date.toDateString();
}

async function getNewsData() {
  try{
let news = localStorage.getItem('news');
  news = await JSON.parse(news);
   if (isThisToday(news.data.lastUpdated.date)) {
     setNewsData(Object.values(news.data.data));
 localStorage.setItem('news', JSON.stringify(news));
   }
   else{
    throw new Error("");
   }
  }catch{ 
 let data = await fetch(
   'https://server.markethealers.com/MarketHealers/getNewsData'
 );
 data = await data.json();
 localStorage.setItem('news', JSON.stringify(data));

 setNewsData(Object.values(data.data.data));
   
  }  
}
      
 
  return (
    <HomeSection >
      <MainContent>
        <Title>Market Healers News</Title>

        <NewsGrid>
          {Object.entries(NewsData).map(([key, value]) => { 
            return (  
              <NewsCardSet
                key={key}
                data={{  news: value }}
              />
            );
          })}
        </NewsGrid>
      </MainContent>
    </HomeSection>
  );
};

export default NewsPage;
