import { Link } from 'react-router-dom'; 
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Headers = styled.header`
  display: flex;
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgb(32, 32, 32);
  color: var(--white);
  z-index: 180;
  position: relative;
  @media only Screen and (max-width: 64em) {
    padding: 0.5rem 5rem;
  }
  @media only Screen and (max-width: 40em) {
    padding: 0.5rem 1rem;
  }
`;

const Logo = styled.a`
  border-radius: 15px;
  background-color: rgb(32, 32, 32);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  cursor: pointer;
  position: relative;
  z-index: 180;
  img {
    border-radius: 40%;
    margin-bottom: 0;
    width: 3rem;
    height: 3rem;
  }
  h3 {
    margin: 0 10px;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2rem;
    color: rgb(255, 248, 239);
  }
  @media only Screen and (max-width: 48em) {
    img {
      width: 2rem;
      height: 2rem;
    }
    h3 {
      font-size: 1.2rem;
    }
  }
`;

const Nav = styled.nav`
  width: 25rem;
  background-color: rgb(32, 32, 32);
  max-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  z-index: 180;
  position: relative;
  @media only Screen and (max-width: 48em) {
    display: none;
  }
  a {
    font-weight: 600;
    line-height: 1.5;
    background-color: rgb(32, 32, 32);
    color: var(--white);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &::after {
      content: '';
      display: block;
      height: 3px;
      width: 0;
      background: transparent;
      transition: width 0.5s;
    }
    &:not(:last-child):hover::after {
      width: 100%;
      background: var(--purple);
    }
    &:hover {
      color: var(--purple);
      transform: scale(1.05);
    }
  }
`;

const HamburgerBtn = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  width: 2rem;
  height: 2px;
  cursor: pointer;
  z-index: 200;
  display: inline-block;
  &::before,
  &::after {
    content: '';
    background-color: ${(props) =>
      props.clicked ? 'var(--purple)' : 'var(--white)'};
    width: 2rem;
    height: 2px;
    position: absolute;
    left: 0;
    transition: all 0.3s ease-in-out;
  }
  &::before {
    top: ${(props) => (props.clicked ? '0' : '-0.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
  }
  &::after {
    top: ${(props) => (props.clicked ? '0' : '0.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
  }
  @media only Screen and (min-width: 76em) {
    display: none;
  }
`;

const MobileMenu = styled.nav`
  visibility: ${(props) => (props.clicked ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.clicked ? '1' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 10%;
  right: 10%;
  font-size:18px;
  border-radius: 20px;
  z-index: ${(props) => (props.clicked ? '1000' : '-1')};
  background-color: rgba(53, 53, 63, 0.95);
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  a {
    font-weight: 600;
    font-size:1.3rem;
    line-height: 1.5;
    color: var(--white);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    &::after {
      content: '';
      display: block;
      height: 3px;
      width: 0;
      background: transparent;
      transition: width 0.5s;
    }
    &:not(:last-child):hover::after {
      width: 100%;
      background: var(--purple);
    }
    &:hover {
      color: var(--purple);
      transform: scale(1.05);
    }
  }
  @media only Screen and (min-width: 76em) {
    display: none;
  }
`;

const Header = () => {
  const [click, setClick] = useState(false);
  const ref = useRef(null);

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div id="home">
      <Headers ref={ref} id="home">
        <Logo>
          <img
            src={
              'https://res.cloudinary.com/dptf0mrro/image/upload/v1735920388/MH__1_1_pjlq6u.png'
            }
            alt="Market Healers"
          />
          <h3>Market Healers</h3>
        </Logo>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/market">Market</Link>
          <Link to="/news">News</Link>
        </Nav>
        <HamburgerBtn
          clicked={click}
          onClick={(e) => {
            e.stopPropagation();
            setClick(!click);
          }}
          aria-label="Toggle menu">
          <span></span>
        </HamburgerBtn>
        <MobileMenu clicked={click}>
          <Link to="/">Home</Link>
          <Link to="/market">Market</Link>
          <Link to="/news">News</Link>
        </MobileMenu>
      </Headers>
    </div>
  );
};

export default Header;
