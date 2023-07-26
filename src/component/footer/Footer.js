import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"; // Replace with the appropriate CSS file for styling

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <button>Sign in for more access</button>
          <span></span>
          <div className="social-icons">
            <a href="https://www.facebook.com" >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.twitter.com">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <p>© 1990-2023 by IMDb.com, Inc.</p>
          <p>Made with React</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
