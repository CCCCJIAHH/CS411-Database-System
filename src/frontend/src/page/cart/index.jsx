import React from 'react';
import Footer from "../../common/Footer";
import {Outlet} from "react-router-dom";
import HomeHeader from "../../common/Header/HomeHeader";

function Cart(props) {
    return (
        <div>
            <HomeHeader/>
                <Outlet/>
            <Footer/>
        </div>
    );
}

export default Cart;