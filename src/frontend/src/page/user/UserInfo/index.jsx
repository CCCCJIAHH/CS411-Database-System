import React from 'react';
import s from "./index.module.css";
import {Link} from "react-router-dom";
import LeftMenu from "../../../common/user/LeftMenu";
import tx from "../../../assets/img/tx.png";

function UserInfo(props) {
    return (
        <div>
            {/*<div className={`${s.address} ${s.mt}`}>*/}
            {/*    <div className={`${s.wrapper} ${s.clearfix}`}>*/}
            {/*        <Link to={"/home"} className={s.fl}>Home page</Link>*/}
            {/*        <span>/</span>*/}
            {/*        <Link to={"/user/info"} className={s.on}>User information</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={s.Bott}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <LeftMenu/>
                    <div className={`${s.you} ${s.fl}`}>
                        <h2>User information</h2>
                        <div className={s.gxin}>
                            <div className={s.tx}><a href="#"><img src={tx}/><p id="avatar">edit avatar</p></a></div>
                            <div className={s.xx}>
                                <h3 className={s.clearfix}><strong className={s.fl}>base information</strong><a href="#"
                                                                                                    className={s.fr}
                                                                                                    id="edit1">edit</a>
                                </h3>
                                <div>username：username</div>
                                <div>birthday：1995-06-06</div>
                                <div>gender：female</div>
                                <h3>advanced information</h3>
                                <div><span className={s.fl}>account district：United State</span><a href="#" className={s.fr} id="edit2">edit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserInfo;