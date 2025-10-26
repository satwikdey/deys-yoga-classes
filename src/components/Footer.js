import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Dey's Yoga Classes. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Find your inner peace through the practice of yoga
        </p>
      </div>
    </footer>
  );
};

export default Footer;
