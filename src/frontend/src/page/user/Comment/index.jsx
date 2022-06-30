import React from 'react';
import s from "./index.module.css";
import {Link} from "react-router-dom";
import LeftMenu from "../../../common/user/LeftMenu";
import nav3 from "../../../assets/img/nav3.jpg"

function Comment(props) {
    return (
        <div>
            {/*<div className={`${s.address} ${s.mt}`}>*/}
            {/*    <div className={`${s.wrapper} ${s.clearfix}`}>*/}
            {/*        <Link to={"/home"} className={s.fl}>Home page</Link>*/}
            {/*        <span>/</span>*/}
            {/*        <Link to={"/user/index"}>User Center</Link>*/}
            {/*        <span>/</span>*/}
            {/*        <Link to={"/user/comment"} className={s.on}>My comment</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={s.Bott}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <LeftMenu/>
                    <div className={`${s.you} ${s.fl}`}>
                        <div className={`${s.my} ${s.clearfix}`}>
                            <h2 className={s.fl}>My comments</h2>
                        </div>
                        <div className={s.dlist}>
                            <ul className={s.clearfix} id="pro">
                                <li className={s.on}><a href="#2">To be commented</a></li>
                                <li><a href="#2">Commented</a></li>
                                <li><a href="#2">Invalid comment</a></li>
                            </ul>
                        </div>
                        <div className={`${s.sx} ${s.clearfix}`}>
                            <div className={s.clearfix}>
                                <dl className={s.fl}>
                                    <dt><a href="#"><img src={nav3}/></a></dt>
                                    <dd><a href="#">Product</a></dd>
                                    <dd>$199.00</dd>
                                    <dd>16000 comments</dd>
                                    <dd><a href="#2">Comment</a></dd>
                                </dl>
                                <dl className={s.fl}>
                                    <dt><a href="#"><img src={nav3}/></a></dt>
                                    <dd><a href="#">Product</a></dd>
                                    <dd>$199.00</dd>
                                    <dd>16000 comments</dd>
                                    <dd><a href="#2">Comment</a></dd>
                                </dl>
                            </div>
                            <div className={s.clearfix}>
                                <dl className={s.fl}>
                                    <dt><a href="#"><img src={nav3}/></a></dt>
                                    <dd><a href="#">Product</a></dd>
                                    <dd>$199.00</dd>
                                    <dd>16000 comments</dd>
                                    <dd><a href="#2">View comment</a></dd>
                                </dl>
                            </div>
                            <div className={s.clearfix}>
                                <dl className={s.fl}>
                                    <dt><a href="#"><img src={nav3}/></a></dt>
                                    <dd><a href="#">Product</a></dd>
                                    <dd>$199.00</dd>
                                    <dd>16000 comments</dd>
                                    <dd><a href="#2">Can't comment yet</a></dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;