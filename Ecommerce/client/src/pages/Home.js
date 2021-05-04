import React from 'react'
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

import { Container } from "reactstrap";
import { Card, CardBody } from 'reactstrap';

const Home = () => {

    const jbstyle = {
        backgroundColor: "#ffffff",
        fontFamily: "Arial",
    }

    const style = {
      margin: "50px 0px 50px 0px",
    }

    return (
        <>
        <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
            rel="stylesheet"
            />
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
            rel="stylesheet"
            />
        <div className="page-header section-dark" style={{
          backgroundImage:
            "url(" + require("../images/mainBG.jpg").default + ")",
        }}>
            <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Got A Spot</h1>
              <div className="fog-low">
                <img
                  alt="..."
                  src={require("../images/fog-low.jpg").default}
                />
              </div>
              <div className="fog-low right">
                <img
                  alt="..."
                  src={require("../images/fog-low.jpg").default}
                />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Travel safe, anywhere you go.
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage:
              "url(" + require("../images/clouds.jpg").default + ")",
          }}
        />
        </div>

    <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron
            text = {['Nature Spots', 'Museums', 'Restaurants', 'Hiking Trails', 'Parks']}
        />
    </div>

    <Card>
    <CardBody style={{ color: "#1c4963", textAlign: "center" }}>
    <blockquote className="blockquote">
    <p>With Got A Spot, users can find new places to travel to and see exactly how 
              busy things will be! With our integrated systems to allow users to reserve their place 
              and see all the safety policies involved with visitation, everyone can feel safe traveling 
              and enjoying their time at various locations.</p>
    </blockquote>
    </CardBody>
    </Card>

    

            <h2 className="text-center" style={style}>
                New Places
            </h2>

        <NewArrivals />

        <h2 className="text-center" style={style}>
                Best Rated
                </h2>

            <BestSellers />

            <h2 className="text-center" style={style}>
                Categories
                </h2>

            <CategoryList />

            <h2 className="text-center" style={style}>
                Sub Categories
                </h2>

            <SubList />


        <br/>
        <br/>
        
         </>
)};




export default Home;
