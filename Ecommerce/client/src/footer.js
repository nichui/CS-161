import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter className="page-footer font-small pt-4 mt-4" style={{ borderTop: "1px solid", backgroundColor: "#f2f7f4" }}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
              Got A Spot
            </h5>
              Got A Spot is a website where users can find new places to travel to and see exactly how 
              busy things will be! With our integrated systems to allow users to reserve their place 
              and see all the safety policies involved with visitation, everyone can feel safe traveling 
              and enjoying their time at various locations.
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="2">
            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
              Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/FAQ">FAQ</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          
        </MDBRow>
      </MDBContainer>
      <div className="text-center">
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-fb mx-1">
              <i className="fab fa-facebook-f"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-tw mx-1">
              <i className="fab fa-twitter"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-gplus mx-1">
              <i className="fab fa-google-plus"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-li mx-1">
              <i className="fab fa-linkedin-in"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-dribbble mx-1">
              <i className="fab fa-dribbble"> </i>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          Cool Beans @CS161 Spring 2021
        </MDBContainer>
      </div>
      
    </MDBFooter>
    
  );
}

export default Footer;
