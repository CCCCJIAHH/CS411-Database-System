import React from 'react';
import "./index.module.css";
import Footer from "../../common/Footer";
import {Outlet} from "react-router-dom";
import HomeHeader from "../../common/Header/HomeHeader";

function User(props) {
    return (
        <div>
            <HomeHeader/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default User;