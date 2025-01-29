import styled, { keyframes } from 'styled-components';

const rotating = keyframes`
  from {
    transform: perspective(1000px) rotateX(-15deg) rotateY(0);
  }
  to {
    transform: perspective(1000px) rotateX(-15deg) rotateY(1turn);
  }
`;

const Wrapper = styled.div`
  width: 150vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: black;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    background: linear-gradient(to right, black, transparent);
    z-index: 20;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
    background: linear-gradient(to left, black, transparent);
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 100px;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  animation: ${rotating} 50s linear infinite;

`;

const Card = styled.div`
  position: absolute;
  width: 150px;
  height: 280px;
  border: 2px solid rgba(${({ color }) => color});
  border-radius: 12px;
  transform: rotateY(calc((360deg / 10) * ${({ index }) => index}))
    translateZ(250px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: radial-gradient(circle, rgba(${({ color }) => color}, 0.9) 100%);
  padding: 10px;
  font-family: Arial, sans-serif;
  color: white;
  backdrop-filter: blur(5px);
  backface-visibility: hidden;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Title1 = styled.h3`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 12px;
  line-height: 1.4;
`;

const cardContents = [
  {
    title: 'Stock Market Fundamentals',
    description:
      'Intro to stock markets, trading basics, market terminology, strategies for beginners.',
  },
  {
    title: 'Achieve Financial Freedom',
    description:
      'Personalized financial planning, passive income insights, long-term wealth strategies.',
  },
  {
    title: 'Trading Courses',
    description:
      'Beginner to advanced levels, real-time practice, certification based on skill level.',
  },
  {
    title: 'Investment Advisory',
    description: 'One-on-one sessions, market insights, analysis.',
  },
  {
    title: 'Workshops & Webinars',
    description: 'Monthly live sessions, Q&A with industry experts.',
  },
  {
    title: 'Portfolio Management',
    description: 'Analyze and diversify portfolios, risk management guidance.',
  },
  {
    title: 'Market Trends',
    description: 'Stay updated with market fluctuations, expert insights.',
  },
  {
    title: 'Financial Planning',
    description: 'Budgeting, saving, retirement planning strategies.',
  },
  {
    title: 'Wealth Building',
    description: 'Long-term investments, compounding strategies.',
  },
  {
    title: 'Services',
    description: 'Comprehensive financial solutions, guidance, and support.',
  },
];

export default function Service() {
  const colors = [
    '142, 249, 252',
    '142, 252, 204',
    '142, 252, 157',
    '215, 252, 142',
    '252, 252, 142',
    '252, 208, 142',
    '252, 142, 142',
    '252, 142, 239',
    '204, 142, 252',
    '142, 202, 252',
  ];

  return (
    <Wrapper>
      <Title1>Services</Title1>
      <Inner>
        {cardContents.map((content, index) => (
          <Card key={index} color={colors[index]} index={index}>
            <Title>{content.title}</Title>
            <Description>{content.description}</Description>
          </Card>
        ))}
      </Inner>
    </Wrapper>
  );
}
