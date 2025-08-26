import React from "react";
import {Link} from 'react-router-dom'
import Logo from "../Logo";

function Footer() {
  return (
    <div className="footer-container">
      
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-3 py-5 my-3 d-flex justify-content-evenly">
        
        <div className="col mb-3 d-flex fs-9 m-2 footer-c">
          
          <Link
            to="/">
            <Logo/>
          </Link>
          <p className="textBody mb-0"> &copy; 2025 Company, Inc</p>
        </div>
        <div className="col mb-4 footer-section">
        <div className="col mb-3 ">
          
          <h5>Section</h5>
          <ul className="nav li-item flex-column">
            
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                Features
              </Link>
            </li>
            <li className="nav-item mb-2 textBody">
              <Link to="/" className="textBody">
                Pricing
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          
          <h5>Section</h5>
          <ul className="nav flex-column">
            
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                Features
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                Pricing
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/" className="textBody">
                About
              </Link>
            </li>
          </ul>
        </div>
      
       
        </div>
      </footer>
    </div>
  );
}

export default Footer;
