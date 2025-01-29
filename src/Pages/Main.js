import MainSection from '../Sections/MainSection/Main';
import Service from '../Sections/MainSection/Service'; 
import About from '../Sections/MainSection/About';

import styled from 'styled-components';

const Container = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const Home = () => {
  return (
    <Container>
      <MainSection />
      <Service />
      
      <About />
    </Container>
  );
};

export default Home;
