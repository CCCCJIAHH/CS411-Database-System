import React, {useEffect, useState} from 'react';
import s from "./index.module.css"
import like01 from "../../../assets/img/temp/like01.jpg"
import {Link} from "react-router-dom";
import axios from "axios";

function CartSuccess(props) {
    const [recommendList, setRecommendList] = useState([])
    useEffect(() => {
        axios.get(`/store/bestseller/`).then(res => {
            console.log(res.data.results)
            setRecommendList(res.data.results.slice(0, 5))
        })
    }, [])
    return (
        <div>
            <div className={`${s.order} ${s.mt} ${s.cart}`}>
                <p className={s.ok}>Payment Success！<Link to={"/user/order"}>Go to order page</Link></p>
            </div>

            <div className={s.like}>
                <h4>Maybe you like</h4>
                <div className={s.bottom}>
                    <div className={"hd"}>
                    </div>
                    <div className={`${s.imgCon} ${s.wrapper} bd`}>
                        <div className={`${s.likeList} ${s.clearfix}`}>
                            <div>
                                {
                                    recommendList.map(item => {
                                        return (
                                            <Link to={`/goods_detail?goods_id=${item.id}`} key={item.id}>
                                                <dl>
                                                    <dt><img src={item.image_url}/></dt>
                                                    <dd>{item.name}</dd>
                                                    <dd>${item.price}</dd>
                                                </dl>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartSuccess;