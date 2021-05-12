import React, {useState} from "react";
import { Row, Container } from "reactstrap";
import "./Footer.css"
import {faHome, faMapMarked, faMarker, faMapMarker} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMapGL, {Marker} from 'react-map-gl';
import { faFacebook, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import {black} from "colorette";

export default function Footer() {
    const [viewport, setViewport] = useState({
        latitude: 37.33656309710032,
        longitude: -121.88114561224849,
        width: "25vw",
        height: "20vh",
        zoom: 13
    })
    return <div className="footer">
        <Container>
            <Row>
                <nav className="footer-nav">
                    <ul className="wordUL">
                        <li>
                            <a
                                href="/"

                            >
                                <h4 className="link">GOT A SPOT</h4>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/About"
                            >
                                <h4 className="link">About Us</h4>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/FAQ"

                            >
                                <h4 className="link">FAQ</h4>

                            </a>
                        </li>
                        <li>
                            <a
                                href="/register"

                            >
                                <h4 className="link">REGISTER</h4>
                            </a>
                        </li>
                    </ul>
                    <Row>
                        <ul className="iconUL">
                            <li>
                                <a href='https://www.facebook.com/Gotaspot-CoolBeans-109379701311475/' style={{color:"white", fontWeight:"bold"}}>
                                <FontAwesomeIcon className="iconFB" icon={faFacebook}/> Facebook</a></li>
                            <li>
                                <a href='https://www.linkedin.com/in/anmoldeepsingh/' style={{color:"white", fontWeight:"bold"}}>
                                <FontAwesomeIcon className="iconLin" icon={faLinkedinIn}/> Linkedin</a></li>
                        </ul>
                    </Row>
                </nav>

                <div className="credits ml-auto">


                    <ReactMapGL
                        className="mapBox"
                        {...viewport}
                        mapboxApiAccessToken={"pk.eyJ1IjoibmdvY29uY2VwdCIsImEiOiJja29pNzVxYmwwMWcxMnZvODcweDgxeGp2In0.oV71ZxSc2UNG5NEE2-wT1A"}
                        mapStyle="mapbox://styles/ngoconcept/ckoi9sdnu03dt18qlyl5r3mty"
                        onViewportChange={viewport => {
                            setViewport(viewport);
                        }}
                    >
                        <Marker
                            latitude={37.33656309710032}
                            longitude={-121.88114561224849}
                        >

                            <FontAwesomeIcon className="markerIcon" icon={faMapMarker}/>

                        </Marker>
                    </ReactMapGL>


                </div>

            </Row>

            <div style={{textAlign:"center"}}>
            <span className="copyright" style={{color:"grey"}}>
            Copyright@  2021 All rights reserved | Team Cool Beans
            </span>
            </div>

        </Container>

    </div>
}

/*const Footer = () => {
  const style = {
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
  }

  const footerMargin = {
    
  }

  return (

    <footer className="footer">

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

export default Footer; */
