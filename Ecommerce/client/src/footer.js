import React, {useState} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Row, Container } from "reactstrap";
import "./Footer.css"
import {faHome, faMapMarked, faMarker, faMapMarker} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMapGL, {Marker} from 'react-map-gl';

export default function Footer() {
    const [viewport, setViewport] = useState({
        latitude: 37.306070,
        longitude: -121.840899,
        width: "20vw",
        height: "20vh",
        zoom: 15
    })
    return <div>
        <ReactMapGL

            {...viewport}
            mapboxApiAccessToken={"pk.eyJ1IjoibmdvY29uY2VwdCIsImEiOiJja29pNzVxYmwwMWcxMnZvODcweDgxeGp2In0.oV71ZxSc2UNG5NEE2-wT1A"}
            mapStyle="mapbox://styles/ngoconcept/ckoi9sdnu03dt18qlyl5r3mty"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
        >
            <Marker
                latitude={37.306070}
                longitude={-121.840899}
            >

                <FontAwesomeIcon className="markerIcon" icon={faMapMarker}/>

            </Marker>
        </ReactMapGL>
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
