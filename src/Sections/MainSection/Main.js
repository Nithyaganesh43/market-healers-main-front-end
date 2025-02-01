import React, { useEffect } from 'react';
import styled from 'styled-components';
import ServiceCard from '../../components/ServiceCard/index';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeSection = styled.section`
  width: 100vw;
  padding-right: 10%;
  padding-left: 10%;
  height: auto;
  background-color: #0a0b10;
  display: flex;
  justify-content: center;
  position: relative;

  @media only screen and (max-width: 480px) {
    padding-right: 0%;
    padding-left: 4%;
    height: 100vh;
  }

  background-image: url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);  
    z-index: 1;
    filter: blur(0px); 
  }

  z-index: 10;
`;


const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  gap: 2rem;

  @media only screen and (max-width: 48em) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 0 10rem 0;
    gap: 0rem;
  }
`;

const Lb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  line-height: 1.5;
  color: var(--white);
  position: relative;
  z-index: 15;

  @media only screen and (max-width: 48em) {
    width: 80%;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
  }
`;

const Title = styled.h1`
  line-height: 1.2;
  padding: 0.5rem 0;
  font-size: calc(5rem + 1.5vw);

  @media only screen and (max-width: 48em) {
    font-size: calc(2rem + 1.5vw);
  }
`;

const SubText = styled.h5`
  color: rgb(207, 207, 207);
  font-size: calc(3rem + 0.5vw);

  @media only screen and (max-width: 48em) {
    font-size: calc(0.8rem + 0.5vw);
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  justify-content: space-around;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap: 1rem;

    margin: 15px;
    margin-top: 0vw;
    width: 90%;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap: 1rem;
    margin: 15px;
    margin-top: 0vw;
    width: 90%;
  }

  @media (max-width: 380px) {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    margin-top: 10vw;
    width: 90%;
  }
`;

const CardContainer = styled.div`
  .container {
    position: relative;
    width: 190px;
    height: 254px;
    transition: transform 200ms ease-in-out;

    @media only screen and (max-width: 42em) {
      width: 35vw;
      height: 180px;
    }

    @media only screen and (max-width: 30em) {
      width: 40vw;
      height: 170px;
    }
  }

  .container:active {
    transform: scale(0.95); /* Avoid layout shift */
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => { 
    const isToastShown = localStorage.getItem('isToastShown');

    if (!isToastShown) {
      toast.success(
        'Click our service card to explore wonderful things and grow yourself!',
        {
          position: 'top-right',
          autoClose: 6000,
        }
      );
 
      localStorage.setItem('isToastShown', 'true');
    }
  }, []);

  return (
    <HomeSection>
      <MainContent>
        <Lb>
          <Title>Welcome</Title>
          <SubText>We're Here to Guide You</SubText>
          <div className="card123">
            <div className="loader123">
              <p>Explore Our Services</p>
              <div className="words">
                <span className="word">Market Data</span>
                <span className="word">Market Data</span>
                <span className="word">News</span>
                <span className="word">Calculator</span>
                <span className="word">Courses</span>
              </div>
            </div>
          </div>
        </Lb>
        <Card>
          <CardContainer
              onClick={() => navigate('/news')}>
            <ServiceCard
              data={{ prompt: 'Today News', text: 'Click To Read' }}
            />
          </CardContainer>
          <CardContainer
              onClick={() =>{ navigate('/market')}}>
            <ServiceCard
              data={{ prompt: 'Live Market Values', text: 'Click To Read' }}
            />
          </CardContainer>
          <CardContainer>
            <ServiceCard
              data={{ prompt: 'Calculators', text: 'Coming Soon...' }}
            />
          </CardContainer>
          <CardContainer>
            <ServiceCard
              data={{ prompt: 'Online Courses', text: 'Coming Soon...' }}
            />
          </CardContainer>
        </Card>
      </MainContent>
      <ToastContainer />
    </HomeSection>
  );
};

export default HeroSection;
