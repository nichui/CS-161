import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Row, Container } from "reactstrap";

const Footer = () => {
  const style = {
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
  }

  const footerMargin = {
    
  }

  return (
    
    <footer className="footer footer-black footer-white sticky-footer">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="/"
                >
                  Got A Spot
                </a>
              </li>
              <li>
                <a
                  href="/About"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/FAQ"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/register"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="#"
                >
                  Live Chat
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="credits ml-auto">
            <span className="copyright">
              Team Cool Beans @CS161
            </span>
          </div>
          
        </Row>
      </Container>
    </footer>
    
  );
}

export default Footer;
