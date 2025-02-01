 
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://www.linkedin.com/in/nithyaganesh43"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-link">
        {' '}
        Crafted by Ng{'  '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="linkedin-icon">
          <path d="M0 1.146C0 .513.324 0 .725 0h14.55c.401 0 .725.513.725 1.146v13.708c0 .633-.324 1.146-.725 1.146H.725A.723.723 0 010 14.854V1.146zM4.943 12.673V6.169H2.542v6.504h2.401zM3.743 5.185c.837 0 1.355-.555 1.355-1.247 0-.704-.533-1.247-1.357-1.247C2.91 2.691 2.4 3.234 2.4 3.938c0 .692.518 1.247 1.318 1.247zm4.992 7.488V9.359c0-.167.013-.334.062-.455.137-.334.449-.68.973-.68.685 0 .958.512.958 1.261v3.188h2.401V9.235c0-2.035-1.083-2.978-2.53-2.978-1.169 0-1.692.65-1.985 1.104v.026h-.013a5.935 5.935 0 01.013-.026V6.17H6.334c.026.684 0 6.503 0 6.503h2.401z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
