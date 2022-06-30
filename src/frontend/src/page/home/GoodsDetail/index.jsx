import React, {useEffect, useState} from 'react';
import s from "./index.module.css";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import proDet from "../../../assets/img/temp/proDet.jpg"
import add from "../../../assets/img/new/add.jpg";
import sub from "../../../assets/img/new/sub.jpg";
import per01 from "../../../assets/img/temp/per02.jpg"
import see01 from "../../../assets/img/temp/see01.jpg"
import {Button, message} from "antd";
import axios from "axios";

function GoodsDetail(props) {
    const [buyNum, setBuyNum] = useState(1)
    const [goods, setGoods] = useState({})
    const [recommendList, setRecommendList] = useState([])
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const goods_id = params.getAll("goods_id")[0]
    useEffect(() => {
        axios.get(`/store/goods/${goods_id}`).then(res => {
            console.log(res.data)
            setGoods(res.data)
            const category_id = res.data.category
            axios.get(`/store/bestseller/?category_id=${category_id}`).then(res => {
                console.log(res.data.results)
                setRecommendList(res.data.results.slice(0, 8))
            })
        })
    }, [goods_id])
    const handleAddCart = () => {
        const user_id = localStorage.getItem("user_id")
        console.log(user_id)
        if (!user_id) {
            navigate("/login", {replace: false})
            return
        }
        axios.post("/store/cartitems/", {
            "user": user_id,
            "goods": goods_id,
            "quantity": buyNum,
        }).then(res => {
            if (res.data.id) {
                message.info("Add to cart successfully! Check your items in your shopping cart.")
            } else {
                message.error("Cannot add to your cart.")
            }
        }, () => {
            message.error("Cannot add to your cart.")
        })
    }

    return (
        <div>
            <div className={s.address}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <Link to={"/home"}>Home page</Link>
                    <span>/</span>
                    <Link to={"/goods"}>category</Link>
                    <span>/</span>
                    <Link to={"/goods_detail"} className="on">goods</Link>
                </div>
            </div>
            <div className={s.detCon}>
                <div className={`${s.proDet} ${s.wrapper}`}>
                    <div className={`${s.proCon} ${s.clearfix}`}>
                        <div className={`${s.proImg} ${s.fl}`}>
                            <img className={"det"} src={goods.image_url}/>
                        </div>
                        <div className={`${s.fr} ${s.intro}`}>
                            <div className={s.title}>
                                <h4>{goods.name}</h4>
                                <p>{goods.description}</p>
                                <span>${goods.price * goods.discount}</span>
                            </div>
                            <div className={s.proIntro}>
                                <p>Sales: &nbsp;&nbsp;<span>{goods.sales}</span></p>
                                <p>Inventory: &nbsp;&nbsp;<span>{goods.inventory}</span></p>
                                <div className={`${s.num} ${s.clearfix}`}>
                                    <img className={`${s.fl} sub`} src={sub}
                                         onClick={() => buyNum === 1 ? 1 : setBuyNum(buyNum - 1)}/>
                                    <span className={s.fl}>{buyNum}</span>
                                    <img className={`${s.fl} add`} src={add}
                                         onClick={() => setBuyNum(buyNum + 1)}/>
                                </div>
                            </div>
                            <div className={`${s.btns} ${s.clearfix}`}>
                                <Button size={"large"} className={`${s.buy} ${s.fl}`}>Buy
                                    now</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button size={"large"} className={`${s.cart}`} onClick={handleAddCart}>Add to
                                    cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${s.introMsg} ${s.wrapper} ${s.clearfix}`}>
                <div className={`${s.msgL} ${s.fl}`}>
                    <div className={`${s.msgTit} ${s.clearfix}`}>
                        
                    </div>
                    <div className={s.msgAll}>
                        <div className={s.eva}>
                           
                            
                        </div>
                    </div>
                </div>
                <div className={`${s.msgR} ${s.fr}`}>
                    <h4>Recommend for you</h4>
                    <div className={s.seeList}>
                        {
                            recommendList.map(item => {
                                return (
                                    <Link to={`/goods_detail?goods_id=${item.id}`} key={item.id}>
                                        <dl>
                                            <dt><img src={item.image_url}/></dt>
                                            <dd>{item.name.substring(0, 40)}</dd>
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
    );
}

export default GoodsDetail;