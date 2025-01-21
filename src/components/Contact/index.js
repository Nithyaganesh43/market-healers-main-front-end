 
 
import styled from 'styled-components';
import './btn.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContactSection = styled.section`
  
  overflow: hidden;
  padding: calc(2.5rem + 2.5vw) 0;
  background-color: #0a0b10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: var(--white);
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 3rem;
  position: relative;
  &::before {
    content: '';
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    /* or 100px */
    border-bottom: 2px solid var(--pink);
  }
`;

const Icons = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: 2rem;
  a {
    &:hover {
      img {
        filter: invert(20%) sepia(100%) saturate(500%) hue-rotate(570deg)
          brightness(100%) contrast(97%);
      }
    }
    &:not(:last-child) {
      margin-right: 1rem;
    }
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: var(--nav2);
    border: none;
    border-radius: 4px;
    color: #eff7f8;
    &:active,
    &:focus {
      border: none;
      outline: none;
      background-color: var(--nav);
    }
    &::placeholder {
      color: #eff7f8;
      opacity: 0.6;
    }
    &[name='name'] {
      margin-right: 0rem;
    }
  }
  textarea {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: var(--nav2);
    border: none;
    border-radius: 4px;
    color: #eff7f8;
    margin-bottom: 2rem;
    &:focus,
    &:active {
      background-color: var(--nav);
    }
    &::placeholder {
      color: #eff7f8;
      opacity: 0.6;
    }
  }
  // button {
  //   padding: 0.8rem 2rem;
  //   background-color: var(--white);
  //   border-radius: 20px;
  //   font-size: 1.2rem;
  //   color: #0a0b10;
  //   cursor: pointer;
  //   transition: transform 0.3s;
  //   &:hover {
  //     transform: scale(1.1);
  //   }
  //   &:active {
  //     transform: scale(0.9);
  //   }
  }
`;

const Row = styled.div`
  @media only Screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;
    input {
      &[name='name'] {
        margin-right: 0;
      }
    }
  }
`;
const Contact = () => {   
  
async function handleClick(e) {
  e.preventDefault();
  
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const text = document.getElementById('text').value;

    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('text').value = '';

     await fetch(
      'https://server.markethealers.com/markethealers/contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, message: text }),
      }
    ).then((e)=>{
      toast.success('Thanks for your interaction!');
    }).catch((e)=>{ 
      toast.error(e.message || 'Something went wrong. Please try again.');
    })
  }  


  return (
    <ContactSection id="contact">
      <Title>Get in touch</Title>
      <Icons>
        <a
          href="https://www.linkedin.com/in/market-healers-66a343344/"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://www.whatsapp.com/channel/0029Vb0CJG7KgsNkWnwFHL3s"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            alt="WhatsApp"
          />
        </a>
        <a
          href="https://www.instagram.com/market.healers/"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
            alt="Instagram"
          />
        </a>
      </Icons>
      <Form>
        <Row>
          <input id={'name'} name="name" type="text" placeholder="your name" />
          <input
            id={'email'}
            name="email"
            type="email"
            placeholder="enter email id"
          />
        </Row>
        <textarea
          name=""
          id="text"
          cols="30"
          rows="2"
          placeholder="your message"></textarea>
        <div style={{ margin: '0 auto' }}>
          <button
            type="button"
            className="btn"
            onClick={async (e) => {
              handleClick(e);
            }}>
            <strong>Submit</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
        </div>
      </Form>
<ToastContainer />
    </ContactSection>
  );
};

export default Contact;
