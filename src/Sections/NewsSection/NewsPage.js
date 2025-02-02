import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiRefreshCw } from 'react-icons/fi';
import NewsCard from '../../components/NewsCard/NewsCard';
import { getNewsData } from '../../Helper/LoadNewsData';
import { LoadingContext } from '../../Context/LoadingContext';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const ReloadIcon = styled(FiRefreshCw)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 1s ease;
  &:active {
    animation: ${rotate} 1s linear;
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
`;

const NewsPage = () => {
  const [MainNewsData, setMainNewsData] = useState([]);
  const [NewsData, setNewsData] = useState([]);
  const [search, setSearch] = useState('');
  const { setloading } = useContext(LoadingContext);

  useEffect(() => {
    if (window.localStorage.getItem('news') !== 'yes') {
      const fetchData = async () => {
        await getNewsData(setMainNewsData, setloading, setNewsData);
      };
      fetchData();
    }
  }, [setMainNewsData]);

  const reloadPage = () => {
    window.localStorage.setItem('news', '');
    window.location.reload();
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
      setNewsData(filteredData);
    } else {
      setNewsData(MainNewsData);
    }
  }, [search, MainNewsData]);

  return (
    <div>
      <FilterContainer>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search news"
        />
        <ReloadIcon onClick={reloadPage} />
      </FilterContainer>
      <div>
        {NewsData.map((group, index) =>
          group[0].map((item, key) => (
            <NewsCard key={`${index}-${key}`} data={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default NewsPage;
