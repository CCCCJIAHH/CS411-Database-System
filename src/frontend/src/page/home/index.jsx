import React from 'react';
import HomeHeader from "../../common/Header/HomeHeader";
import Footer from "../../common/Footer";
import {Outlet} from "react-router-dom";

function Index(props) {
    return (
        <div>
            <HomeHeader/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Index;