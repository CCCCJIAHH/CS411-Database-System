import React from 'react';
import s from "./index.module.css";
import {Link} from "react-router-dom";
import LeftMenu from "../../../common/user/LeftMenu";
import g1 from "../../../assets/img/g1.jpg"

function OrderDetail(props) {
    return (
        <div>
           
            <div className={s.Bott}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <LeftMenu/>
                    <div className={`${s.you} ${s.fl}`}>
                        <div className={`${s.my} ${s.clearfix}`}>
                            <h2>Order detail</h2>
                           
                        </div>
                        <div className={s.orderList}>
                            <div className={s.orderList1}>
                                <h3>Received</h3>
                                <div className={s.clearfix}>
                                    <a href="#" className={s.fl}><img src={g1}/></a>
                                    <p className="fl"><a href="#">Product name</a><a href="#">$99.00×1</a></p>
                                </div>
                            </div>
                            <div className={s.orderList1}>
                                <h3>Receiver information</h3>
                                <p>Name：<span>sawyer</span></p>
                                <p>Phone：<span>2002002200</span></p>
                                <p>Address：<span>210 S 4th ST</span></p>
                            </div>
                            <div className={s.orderList1}>
                                <h3>Payment and Delivery</h3>
                                <p>Payment：<span>online</span></p>
                                <p>Delivery：<span>UPS</span></p>
                            </div>
                            <div className={`${s.orderList1} ${s.hei}`}>
                                <h3><strong>Total：</strong><span>$99</span></h3>
                                <p><strong>shipping：</strong><span>$0</span></p>
                                <p><strong>order amount：</strong><span>$99</span></p>
                                <p><strong>real amount：</strong><span>$99</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OrderDetail;
