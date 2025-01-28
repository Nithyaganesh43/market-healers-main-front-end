import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import NewsCard from '../../components/NewsCard/NewsCard';
import { getNewsData } from '../../Helper/LoadNewsData';
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
  margin-left:12vw;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 48em) {
    margin: auto;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0rem 1rem;
  margin-top: 1rem;
  width: 90%;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 5vw;
    margin-left: 5vw;
  }
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    margin-top: 10vw;
    padding: 0;
    margin-bottom: 10rem;
    margin-left: 5vw;
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

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  width: 90%;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  box-sizing: border-box;
  align-items: center;

  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 10px 10px;
    gap: 5px;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #4a148c;
  border-radius: 5px;
  outline: none;
  color: #000;
  background-color: #fff;
  flex: 1;
  width: 95%;
  box-sizing: border-box; 
  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #8e24aa;
  }

  @media only screen and (max-width: 480px) {
    flex: 2;
    position: fixed;
  }
`;

const NewsPage = () => {
  const [MainNewsData, setMainNewsData] = useState([]);
  const [NewsData, setNewsData] = useState([]);
  const [search, setSearch] = useState('');
  const { setloading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      await getNewsData(setMainNewsData, setloading, setNewsData);
    };
    fetchData();
  }, []);

const latestSort = (newsData) => {
  const allNews = newsData.flatMap((group) => group[0] || []);
  allNews
    .filter((news) => news && news.publishedAt)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const groupedByDay = {};
  allNews.forEach((news) => {
    if (news && news.publishedAt) {
      const day = new Date(news.publishedAt).toISOString().split('T')[0];
      if (!groupedByDay[day]) groupedByDay[day] = [];
      groupedByDay[day].push(news);
    }
  });

  return Object.values(groupedByDay).map((dayGroup) => [dayGroup]);
};


useEffect(() => {
  if (search.length > 0) {
    const filteredData = MainNewsData.map((group) => {
      if (group && group[0]) {
        return [
          group[0].filter(
            (v) =>
              v &&
              (v.title?.toLowerCase().includes(search.toLowerCase()) ||
                v.description?.toLowerCase().includes(search.toLowerCase()))
          ),
        ];
      }
      return null;
    }).filter((group) => group && group[0]?.length > 0);

    setNewsData(latestSort(filteredData));
  } else {
    setNewsData(latestSort(MainNewsData));
  }
}, [search, MainNewsData]);

  return (
    <HomeSection>
      <MainContent>
        <Title>Market Healers News</Title>
        <FilterContainer>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news"
          />
        </FilterContainer>
        <NewsGrid>
          {NewsData.map((group, index) =>
            group[0].map((item, key) => { 
              return (
                <NewsCard
                  key={`${index}-${key}`}
                  data={{
                    content: item.content,
                    description: item.description,
                    image: item.image,
                    publishedAt: item.publishedAt,
                    source: item.source,
                    title: item.title,
                    url: item.url,
                  }}
                />
              );})
          )}
        </NewsGrid>
      </MainContent>
    </HomeSection>
  );
};

export default NewsPage;
