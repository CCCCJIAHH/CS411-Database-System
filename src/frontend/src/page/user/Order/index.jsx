import React, { useEffect, useState } from 'react';
import s from "./index.module.css";
import tx from "../../../assets/img/new/tx.png"
import g1 from "../../../assets/img/g1.jpg"
import zuo from "../../../assets/img/zuo.jpg"
import you from "../../../assets/img/you.jpg"
import LeftMenu from "../../../common/user/LeftMenu";
import { Link } from "react-router-dom";
import { Pagination } from 'antd';
import { Input } from 'antd';
import axios from "axios";
const { Search } = Input;
function Order(props) {
    const [order, setOrder] = useState({});
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        axios.get(`/store/orders/?user_id=${user_id}`).then(res => {
            console.log(res.data.results)
            setOrderList(res.data)
            console.log(res.data)

        })
    }, [])



    return (
        <div>

            <div className={s.Bott}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <LeftMenu />
                    <div className={`${s.you} ${s.fl}`}>
                        <div className={`${s.my} ${s.clearfix}`}>
                            <h2 className={s.fl}>My order</h2>
                        </div>
                        <div className={`${s.dlist} ${s.clearfix}`}>
                            <ul className={`${s.fl} ${s.clearfix}`} id="wa">
                            </ul>
                        </div>
                        {
                            orderList.map((item) => {
                                return (
                                    <div className={`${s.dkuang} ${s.clearfix} ${s.deng}`}>
                                        <div className={s.clearfix}></div>
                                        <p className={s.fr}>
                                                           
                                    </p>
                                        {
                                            item.orderitems.map((orderitem) => {
                                                return (
                                                    <div>
                                                        <div style={{paddingTop: '10px'}} className={`${s.word} ${s.clearfix}`}>
                                                            <ul className={`${s.fl} ${s.clearfix}`}>
                                                            <li>Status:{item.status}</li>
                                                            <li>Goods Name:{orderitem.goods.name}</li>
                                                            <li>Price:{orderitem.order_price}</li>
                                                            <li>discount:{item.discount}</li>                        
                                                            </ul>
                                                            
                                                        </div>
                                                        <div className={`${s.shohou} ${s.clearfix}`}>
                                                            <a href="#" className={s.fl}><img src={orderitem.goods.image_url} /></a>
                                                            <p className={s.fl}><a href="#">{orderitem.name}</a><a href="#">Price:{orderitem.order_price}×{orderitem.quantity}</a></p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <p className={s.fr}></p>
                                        <p className={`${s.one} ${s.fl}`}>Order amount：<span>{item.total_price}</span></p>
                                        
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/*<div className={`${s.fenye} ${s.clearfix}`}>*/}

                    {/*    /!*<Link to="#"><img src={zuo}/></Link>*!/*/}
                    {/*    /!*<Link to="#">1</Link>*!/*/}
                    {/*    /!*<Link to="#"><img src={you}/></Link>*!/*/}
                    {/*</div>*/}
                   
                    <div style={{ textAlign: "center" }}>
                        <Pagination defaultCurrent={1} total={50} />
                    </div>
                </div>
            </div>

        </div>


    );
}

export default Order;