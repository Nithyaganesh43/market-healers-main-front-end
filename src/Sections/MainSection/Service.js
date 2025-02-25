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
  height: 111vh;
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
  height: 500px;
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
  width: 190px;
  height: 250px;
  border: 2px solid rgba(${({ color }) => color});
  border-radius: 12px;
  transform: rotateY(calc((360deg / 10) * ${({ index }) => index}))
    translateZ(300px); /* Increased distance */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: radial-gradient(circle, rgba(${({ color }) => color}, 0.9) 100%);
  padding: 5px;
  font-family: Arial, sans-serif;
  color: white;
  backdrop-filter: blur(5px);
  backface-visibility: hidden;

  @media (max-width: 768px) {
    width: 100px;
    height: 300px;
    padding: 2px;
    transform: rotateY(calc((360deg / 10) * ${({ index }) => index}))
      translateZ(150px);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;

  padding-top: 10px;
  @media (max-width: 768px) {
    font-size: 10px;
    padding-top: 10px;
  }
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
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
const cardContents = [
  {
    title: 'Workshops and Webinars',
    description:
      'Stay informed about the latest financial trends through interactive workshops and webinars. Engage in live Q&A sessions with industry experts and discover innovative investment strategies.',
  },
  {
    title: 'Options and Derivatives Trading',
    description:
      'Enhance your trading expertise with comprehensive knowledge of options and derivatives. Learn about hedging strategies, leverage, and risk management techniques to improve your returns.',
  },
  {
    title: 'Algo Trading and Automation',
    description:
      'Explore the future of trading with algorithmic trading and automation. Discover how to develop and implement automated strategies, leverage AI-driven insights, and improve efficiency.',
  },
  {
    title: 'Technical and Fundamental Analysis',
    description:
      'Master technical and fundamental analysis to enhance your stock market skills. Learn to interpret price charts, identify trends, and evaluate company financials effectively.',
  },
  {
    title: 'Cryptocurrency and Blockchain Investments',
    description:
      'Explore the dynamic world of cryptocurrencies and blockchain technology. Gain insights into Bitcoin, Ethereum, and various altcoins, understand market trends, and learn secure investment strategies.',
  },
  {
    title: 'Achieve Financial Independence',
    description:
      'Take control of your financial future with tailored financial planning and proven wealth-building strategies. Discover the benefits of passive income, long-term investment techniques, and effective money management.',
  },
  {
    title: 'Stock Market Fundamentals',
    description:
      'Build a strong foundation in stock market investing with our comprehensive introduction to trading. Understand essential market terminology, explore trading strategies for beginners, and learn how to analyze stock performance.',
  },
  {
    title: 'Comprehensive Trading  Programs',
    description:
      'Learn the art of trading through structured courses tailored for beginners, intermediate traders, and advanced professionals. Participate in real-time market simulations, receive guidance from experts, and earn a certification upon completion.',
  },
  {
    title: 'Portfolio Management Support',
    description:
      'Optimize your investments with expert guidance on diversification and risk management. Learn how to analyze trends, allocate assets effectively, and make data-driven investment decisions.',
  },
  {
    title: 'Investment Advisory Services',
    description:
      'Make informed investment decisions with one-on-one advisory sessions. Our experts provide customized strategies based on your risk appetite and financial goals, along with monthly insights and market analysis.',
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
