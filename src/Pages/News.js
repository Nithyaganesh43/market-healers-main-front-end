 
import styled from 'styled-components';
 import NewsPage from '../Sections/NewsSection/NewsPage';
const Container = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const News = () => {
  return (
    <Container>  
        <NewsPage/>
    </Container>
  );
};

export default News;
