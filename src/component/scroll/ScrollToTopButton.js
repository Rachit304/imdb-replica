import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={handleScrollToTop}
    >
      <div className="logo-container">
        {/* Add your logo here */}
        {/* Example: <img src="logo.png" alt="Logo" /> */}
      </div>
      <div className="arrow-container">
        <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
      </div>
    </div>
  );
};

export default ScrollToTopButton;
