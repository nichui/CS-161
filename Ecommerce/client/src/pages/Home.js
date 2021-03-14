import React from 'react'
/*import './App.css';*/

import Jumbotron from "../components/cards/Jumbotron";

import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {

    return (
        <>
    <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron
            text = {['Nature Spots', 'Museums', 'Restaurants']}
        />
    </div>

            <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
                Got A Spot
            </h4>

        <NewArrivals />

            <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
                Best Rated
            </h4>

            <BestSellers />

            <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
                Categories
            </h4>

            <CategoryList />

            <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
                Sub Categories
            </h4>

            <SubList />


        <br/>
        <br/>
        </>
)};




export default Home;
