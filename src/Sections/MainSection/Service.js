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
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, black, black);
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
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    z-index: -1;
  }

  z-index: 10;
`;

const Inner = styled.div`
  position: absolute;
  top: 200px;
  transform: translateY(-50%);
  width: 150px;
  height: 80vh;
  transform-style: preserve-3d;
  animation: ${rotating} 100s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 60vh;
  }
`;


const Card = styled.div`
  position: absolute;
  width: 180px;
  height: 300px;
  border: 2px solid rgba(${({ color }) => color});
  border-radius: 12px;
  transform: rotateY(calc((360deg / 10) * ${({ index }) => index}))
    translateZ(300px); /* Increased distance */
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

  @media (max-width: 768px) {
    width: 95px;
    height: 250px;
    transform: rotateY(calc((360deg / 10) * ${({ index }) => index}))
      translateZ(150px);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Title1 = styled.h3`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  text-align: center;
  position: absolute;
  top: 10%; /* Moved up */

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 12px;
  line-height: 1.4;
`;

const cardContents = [
  {
    title: 'Stock Market Fundamentals',
    description:
      'Gain a solid foundation in stock market investing with our comprehensive introduction to trading. Learn essential market terminology, trading strategies for beginners, and how to analyze stock performance.',
  },
  {
    title: 'Achieve Financial Freedom',
    description:
      'Take control of your financial future with personalized financial planning and proven wealth-building strategies. Discover the power of passive income, long-term investment approaches, and smart money management techniques.',
  },
  {
    title: 'Trading Courses',
    description:
      'Master the art of trading with structured courses for beginners, intermediate traders, and advanced professionals. Engage in real-time market simulations, receive expert mentorship, and earn certification upon completion.',
  },
  {
    title: 'Investment Advisory Services',
    description:
      'Make informed investment decisions with one-on-one advisory sessions. Our experts provide customized strategies based on your risk appetite and financial goals, along with monthly insights and market analysis.',
  },
  {
    title: 'Workshops and Webinars',
    description:
      'Stay updated with the latest financial trends through interactive workshops and webinars. Participate in live Q&A sessions with industry experts and explore cutting-edge investment strategies.',
  },
  {
    title: 'Portfolio Management Support',
    description:
      'Optimize your investments with expert guidance on diversification and risk management. Learn how to analyze trends, allocate assets effectively, and make data-driven investment decisions.',
  },
  {
    title: 'Technical and Fundamental Analysis',
    description:
      'Develop a keen eye for stock market movements by mastering technical and fundamental analysis. Learn how to interpret price charts, identify trends, and evaluate company financials.',
  },
  {
    title: 'Options and Derivatives Trading',
    description:
      'Expand your trading expertise with in-depth knowledge of options and derivatives. Understand hedging strategies, leverage, and risk management techniques to enhance your returns.',
  },
  {
    title: 'Algo Trading and Automation',
    description:
      'Step into the future of trading with algorithmic trading and automation. Learn how to develop and deploy automated strategies, utilize AI-driven insights, and enhance efficiency.',
  },
  {
    title: 'Cryptocurrency and Blockchain Investments',
    description:
      'Explore the dynamic world of cryptocurrencies and blockchain technology. Gain insights into Bitcoin, Ethereum, and altcoins, understand market trends, and learn secure investment strategies.',
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
