import React from 'react'
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
    const style = {
        backgroundColor: "#d0dbd1",
        fontSize: "12px",
    };

    const jbstyle = {
        backgroundColor: "#ffffff",
        fontFamily: "Papyrus",
    }

    const titleStyle = {
        fontFamily: "Papyrus",
        backgroundColor: "#ffffff",
        fontSize: "50px",
        fontWeight: 'bold',
        letterSpacing: '5px',
    };

    return (
        <div style={style}>
        <>
        <h4 className="text-center p-3 mb-5 display-4 jumbotron" style={titleStyle}>Got A Spot</h4>
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
        </div>
)};




export default Home;
