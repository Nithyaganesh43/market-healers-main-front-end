import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import Market from '../Sections/MarketSection/MarketPage';

const Container = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MarketPage = () => {
  return (
    <>
      <Marquee
        speed={50}
        gradient={true}
        gradientColor={[0, 0, 0, 0, 0, 0]}
        style={{
          background: 'linear-gradient(to right, #000, #333, #000)',
          color: 'white',
          padding: '10px 0',
          textAlign: 'center',
          fontWeight: 'bold',
          overflow: 'hidden',
        }}>
        <span style={{ color: 'red' }}>
          Notice<div>{'  '}</div>
        </span>
        <span style={{ color: 'green' }}>
          The market data displayed on this website is delayed by 15 minutes and
          may not reflect the most accurate or up-to-date information.
        </span>
        <div>{'  '}</div>
        <span style={{ color: 'red' }}>
          Please do not rely on this data for investment decisions.
          <div>{'  '}</div>
        </span>
        <div>{'  '}</div>
        <span style={{ color: 'green' }}>
          MarketHealers is not responsible for any financial losses incurred
          from using this information.
        </span>
      </Marquee>
      <Container>
        <Market />
      </Container>
    </>
  );
};

export default MarketPage;
