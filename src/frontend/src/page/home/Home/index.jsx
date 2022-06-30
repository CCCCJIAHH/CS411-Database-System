import React, {useEffect, useState} from 'react';
import s from "./index.module.css";
import banner from "../../../assets/img/banner1.jpg"
import {Link} from "react-router-dom";
import flo from "../../../assets/img/flo1.jpg"
import axios from "axios";

function Home(props) {
    const [goodsList, setGoodsList] = useState([])
    useEffect(() => {
        axios.get(`/store/front_recommend/`).then(res => {
            console.log(res.data)
            setGoodsList(res.data.slice(0, 12))
        })
    }, [])
    return (
        <div>
            <div className={s.news}>
                <div className={s.wrapper}>
                    <h1 style={{textAlign: "center"}}>Welcome to ToBuy!</h1>
                    <h1 style={{textAlign: "center"}}>Check the best selling below</h1>
                    <ul className={`${s.proList} ${s.wrapper} ${s.clearfix}`}>
                        {
                            goodsList.map((item) => {
                                return <li key={item.id}>
                                    <Link to={`/goods_detail?goods_id=${item.id}`}>
                                        <dl>
                                            <dt><img src={item.image_url}/></dt>
                                            <dd>{item.name}</dd>
                                            <dd>${item.price}</dd>
                                        </dl>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Home;