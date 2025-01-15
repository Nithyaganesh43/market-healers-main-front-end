 
import styled from 'styled-components';
import Market from '../Sections/MarketSection/MarketPage'
const Container = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const MarketPage = () => {
  return (
    <Container>
      <Market />
    </Container>
  );
};

export default MarketPage;
