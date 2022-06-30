import React from 'react';
import s from "./index.module.css"
import tx from "../../../assets/img/new/tx.png"
import {Link, NavLink} from "react-router-dom";

function LeftMenu(props) {
    return (
        <div className={s.Bott}>
                <div className={`${s.zuo} ${s.fl}`}>
                    <h3>
                        <Link to={"#"}><img src={tx}/></Link>
                        <p className={s.clearfix}><span >[username]</span></p>
                        <p className={s.clearfix}><span >[Logout]</span></p>
                    </h3>
                    <div>
                        <h4>My Transaction</h4>
                        <ul>
                            <li><NavLink to={"/cart/list"}>My cart</NavLink></li>
                            <li><NavLink to={"/user/order"}>My order</NavLink></li>
                            <li><NavLink to={"/user/comment"}>My comment</NavLink></li>
                        </ul>
                        <h4>User Center</h4>
                        <ul>
                            <li><NavLink to={"/user/index"}>My center</NavLink></li>
                            <li><NavLink to={"/user/address"}>My address</NavLink></li>
                        </ul>
                        <h4>Account Management</h4>
                        <ul>
                            <li><NavLink to={"/user/info"}>User information</NavLink></li>
                            <li><NavLink to={"/user/change_password"}>Change password</NavLink></li>
                        </ul>
                    </div>
                </div>
        </div>
    );
}

export default LeftMenu;
