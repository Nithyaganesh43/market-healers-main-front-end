import styled, { keyframes } from 'styled-components';
import wave from '../../assets/waves.svg';
import aboutIMG from '../../assets/aboutIMG.jpg';
const move = keyframes`
0% { transform: translateY(-5px)         }
    50% { transform: translateY(10px) translateX(10px)        }
    100% { transform: translateY(-5px)         }
`;

const AboutSection = styled.section`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Waves = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: -1rem;
`;

const Main = styled.div`
  margin: 0 15rem;
  margin-top: 15rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only Screen and (max-width: 64em) {
    margin: 0 calc(5rem + 5vw);
    margin-top: 10rem;
  }
  @media only Screen and (max-width: 40em) {
    align-items: center;
    margin: 3rem calc(3rem + 3vw);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  display: inline-block;
`;

const CurvedLine = styled.div`
  width: 7rem;
  height: 2rem;
  border: solid 5px var(--purple);
  border-color: var(--purple) transparent transparent transparent;
  border-radius: 150%/60px 70px 0 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only Screen and (max-width: 40em) {
    flex-direction: column;
  }
`;

const Rocket = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  padding-bottom: 5rem;
  animation: ${move} 2.5s ease infinite;
  @media only Screen and (max-width: 40em) {
    width: 50vw;
    padding-bottom: 0;
  }
`;

const Text = styled.h4`
  font-size: calc(0.5rem + 1vw);
  line-height: 1.5;
  color: var(--nav2);
  text-align: justify;
`;

const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.5rem;
  margin-top: 1rem;
`;
const AboutText = styled.div`
  width: 200%;
  left: 10%;
  position: relative;
  @media only Screen and (max-width: 40em) {
    width: 100%;
    left: 0;
    margin-top: 20px;
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Waves src={wave} alt="" />

      <Main>
        <div></div>
        <Content>
          <Rocket>
            <img src={aboutIMG} alt="" width="600" height="400" />
          </Rocket>
          <AboutText>
            <Title>About Us</Title>
            <CurvedLine />
            <Text>
              Welcome to Market Healers, where we transform the complexities of
              the stock market into a powerful resource for your financial
              independence. Founded in 2024, our mission is straightforward: to
              help you understand the stock market so you can make smarter, more
              confident financial decisions.
            </Text>
            <br></br>
            <Title>Mission</Title>
            <Text>
              <CurvedLine />
              We are dedicated to guiding you on your journey to financial
              independence, teaching you how to make informed decisions that
              will shape your future.
            </Text>
            <br></br>
            <Title>Vision</Title>
            <CurvedLine />
            <Text>
              Our vision is to create the largest community in India of
              individuals who are not only financially independent but also
              financially empowered.
            </Text>
            <div>
              <Circle style={{ backgroundColor: 'var(--black)' }} />
              <Circle style={{ backgroundColor: 'var(--black)' }} />
              <Circle style={{ backgroundColor: 'var(--black)' }} />
            </div>
          </AboutText>
        </Content>
      </Main>
    </AboutSection>
  );
};

export default About;
