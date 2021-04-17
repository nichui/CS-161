import React from 'react'
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

import { Container } from "reactstrap";

const Home = () => {

    const jbstyle = {
        backgroundColor: "#ffffff",
        fontFamily: "Arial",
    }

    return (
        <>
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

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" style={jbstyle}>
                New Places
            </h4>

        <NewArrivals />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" style={jbstyle}>
                Best Rated
            </h4>

            <BestSellers />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" style={jbstyle}>
                Categories
            </h4>

            <CategoryList />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron" style={jbstyle}>
                Sub Categories
            </h4>

            <SubList />


        <br/>
        <br/>
        
         </>
)};




export default Home;
