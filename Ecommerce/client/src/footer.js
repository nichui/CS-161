import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Row, Container } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer footer-black footer-white" style={{ backgroundColor: "#d0dbd1" }}>
      <Container>
      <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Got A Spot</h5>
              Got A Spot is a website where users can find new places to travel to and see exactly how 
              busy things will be! With our integrated systems to allow users to reserve their place 
              and see all the safety policies involved with visitation, everyone can feel safe traveling 
              and enjoying their time at various locations.
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="/"
                  target="_blank"
                >
                  Got A Spot
                </a>
              </li>
              <li>
                <a
                  href="/About"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/FAQ"
                  target="_blank"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                >
                  Register
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
