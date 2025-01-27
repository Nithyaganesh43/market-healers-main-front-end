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
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #8e24aa;
  }

  @media only screen and (max-width: 480px) {
    flex: 2;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #6a1b9a;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: auto;
  white-space: nowrap;

  &:hover {
    background-color: #8e24aa;
  }

  &:active {
    background-color: #4a148c;
  }

  @media only screen and (max-width: 480px) {
    flex: 1;
    font-size:12px;
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

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = MainNewsData.map((group) => [
        group[0].filter(
          (v) =>
            v.title.toLowerCase().includes(search.toLowerCase()) ||
            v.description.toLowerCase().includes(search.toLowerCase())
        ),
      ]).filter((group) => group[0].length > 0);
      setNewsData(filteredData);
    } else {
      setNewsData(MainNewsData);
    }
  }, [search, MainNewsData]);

  const latestSort = () => {
    const allNews = NewsData.flatMap((group) => group[0]);
    allNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    const groupedByDay = {};
    allNews.forEach((news) => {
      const day = new Date(news.publishedAt).toISOString().split('T')[0];
      if (!groupedByDay[day]) groupedByDay[day] = [];
      groupedByDay[day].push(news);
    });
    const sortedData = Object.values(groupedByDay).map((dayGroup) => [
      dayGroup,
    ]);
    setNewsData(sortedData);
  };

  return (
    <HomeSection>
      <MainContent>
        <Title>Market Healers News</Title>
        <FilterContainer>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news"
          />
          <Button onClick={latestSort}>Latest First</Button>
        </FilterContainer>
        <NewsGrid>
          {NewsData.map((group, index) =>
            group[0].map((item, key) => (
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
            ))
          )}
        </NewsGrid>
      </MainContent>
    </HomeSection>
  );
};

export default NewsPage;
