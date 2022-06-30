import React from 'react';
import HomeHeader from "../../common/Header/HomeHeader";
import Home from "../home/Home";
import Footer from "../../common/Footer";

function Entrance(props) {
    return (
        <div>
            <HomeHeader/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default Entrance;