import React from 'react';
import s from "./index.module.css";
import {Link} from "react-router-dom";
import LeftMenu from "../../../common/user/LeftMenu";
import tx from "../../../assets/img/tx.png"
import logo1 from "../../../assets/img/new/gxin1.jpg"
import logo2 from "../../../assets/img/new/gxin2.jpg"
import logo3 from "../../../assets/img/new/gxin3.jpg"
import logo4 from "../../../assets/img/new/gxin4.jpg"

function UserCenter(props) {
    return (
        <div>
            {/*<div className={`${s.address} ${s.mt}`}>*/}
            {/*    <div className={`${s.wrapper} ${s.clearfix}`}>*/}
            {/*        <Link to={"/home"} className={s.fl}>Home page</Link>*/}
            {/*        <span>/</span>*/}
            {/*        <Link to={"/user/index"} className={s.on}>User Center</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={s.Bott}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <LeftMenu/>
                    <div className={`${s.you} ${s.fl}`}>
                        <div className={`${s.tx} ${s.clearfix}`}>
                            <div className={`${s.fl} ${s.clearfix}`}>
                                <a href="#" className={s.fl}><img src={tx}/></a>
                                <p className={s.fl}><span>Username</span><Link to={"/user/info"}>edit personal information></Link></p>
                            </div>
                            <div className={s.fr}>Email：fakenews@illinois.edu</div>
                        </div>
                        <div className={s.bott}>
                            <div className={s.clearfix}>
                                <a href="#" className={s.fl}><img src={logo1}/></a>
                                <p className={s.fl}><span>Orders to be paid：<strong>0</strong></span>
                                    <Link to={"/user/order"}>View Orders to be paid></Link>
                                </p>
                            </div>
                            <div className={s.clearfix}>
                                <a href="#" className={s.fl}><img src={logo2}/></a>
                                <p className={s.fl}><span>Pending receiving orders：<strong>0</strong></span>
                                    <Link to={"/user/order"}>View Pending receiving orders></Link>
                                </p>
                            </div>
                            <div className={s.clearfix}>
                                <a href="#" className={s.fl}><img src={logo3}/></a>
                                <p className={s.fl}><span>Orders to be commented：<strong>0</strong></span>
                                    <Link to={"/user/comment"}>View Orders to be commented</Link>
                                </p>
                            </div>
                            <div className={s.clearfix}>
                                <a href="#" className={s.fl}><img src={logo4}/></a>
                                <p className={s.fl}><span>Likes：<strong>0</strong></span>
                                    <a href="#">View likes></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserCenter;
