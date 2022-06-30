import React, {useEffect, useReducer, useState} from 'react';
import s from "./index.module.css";
import {Link, useNavigate} from "react-router-dom";
import cart01 from "../../../assets/img/temp/cart01.jpg";
import sub from "../../../assets/img/new/sub.jpg";
import add from "../../../assets/img/new/add.jpg";
import axios from "axios";
import {Button, message, Popconfirm} from "antd";

function CartList(props) {
    const [cartItemList, setCartItemList] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        if (!user_id) {
            navigate("/login", {replace: false})
            return
        }
        axios.get(`/store/cartitems/?user_id=${user_id}`).then(res => {
            console.log(res.data)
            setCartItemList(res.data)
            let cost = 0, count = 0
            res.data.forEach((item) => {
                cost += item.total_price
                count += item.quantity
            }, 0)
            setTotalCount(count)
            setTotalCost(cost.toFixed(2))
        }, () => {
            message.error("Cannot get your shopping cart. Please try again later.")
        })
    }, [])

    const handleDelete = (id) => {
        return () => {
            const user_id = localStorage.getItem("user_id")
            axios.delete(`/store/cartitems/${id}/?user_id=${user_id}`).then(() => {
                let price = totalCost
                let count = totalCount
                setCartItemList(cartItemList.filter((item) => {
                    if (item.id === id) {
                        price -= item.total_price
                        count -= item.quantity
                    }
                    return item.id !== id
                }))
                setTotalCost(price.toFixed(2))
                setTotalCount(count)
                message.info("Delete item successfully!")
            })
        }
    }

    const handleQuantityChange = (id, quantity) => {
        return () => {
            console.log(id, quantity)
            if (quantity < 1) return
            const user_id = localStorage.getItem("user_id")
            axios.patch(`/store/cartitems/${id}/?user_id=${user_id}`, {"quantity": quantity}).then(() => {
                cartItemList.forEach((item) => {
                    if (item.id === id) {
                        item.quantity = quantity
                        const total_price = Number(item.goods.price) * quantity
                        item.total_price = Number(total_price.toFixed(2))
                    }
                })
                let price = 0
                let count = 0
                setCartItemList(cartItemList.filter((item) => {
                    if (item.id === id) {
                        price += item.total_price
                        count += item.quantity
                    }
                    return item.id !== 0
                }))
                setTotalCost(price.toFixed(2))
                setTotalCount(count)
            })
            // window.location.reload()
        }
    }

    return (
        <div className={`${s.cart} ${s.mt}`}>
            <div className={s.site}>
                <p className={`${s.wrapper} ${s.clearfix}`}>
                    <span className={s.fl}>Shopping cart</span>
                    <Link to={"/home"} className={s.fr}>Continue to shopping&gt;</Link>
                </p>
            </div>
            <div className={`${s.table} ${s.wrapper}`}>
                <div className={s.tr}>
                    <div>Goods</div>
                    <div>Unit price</div>
                    <div>Count</div>
                    <div>Subtotal</div>
                    <div>Operation</div>
                </div>
                {
                    cartItemList.map((item) => {
                        return (
                            <div className={s.th} key={item.id}>
                                <div className={`${s.pro} ${s.clearfix}`}>
                                    <label className={s.fl}>
                                        <input type="checkbox"/>
                                    </label>
                                    <a className={s.fl} href="#">
                                        <dl className={s.clearfix}>
                                            <dt className={s.fl}><img src={item.goods.image_url}/></dt>
                                            <dd className={s.fl}>
                                                <p>{item.goods.name}</p>
                                                <p>{item.goods.description}</p>
                                            </dd>
                                        </dl>
                                    </a>
                                </div>
                                <div className={s.price}>${item.goods.price}</div>
                                <div className={s.number}>
                                    <p className={`${s.num} ${s.clearfix}`}>
                                        <img className={`${s.fl} sub`} src={sub}
                                             onClick={handleQuantityChange(item.id, item.quantity - 1)}/>
                                        <span className={s.fl}>{item.quantity}</span>
                                        <img className={`${s.fl} add`} src={add}
                                             onClick={handleQuantityChange(item.id, item.quantity + 1)}/>
                                    </p>
                                </div>
                                <div className={`${s.price} sAll`}>${item.total_price}</div>
                                <Popconfirm
                                    title="Are you sure to delete this item?"
                                    onConfirm={handleDelete(item.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <div className={s.price}><a className={s.del}>Delete</a></div>
                                </Popconfirm>
                            </div>
                        )
                    })
                }
                <div className={s.goOn}>Nothing here~<Link to={"/index"}>Go to shopping</Link></div>
                <div className={`${s.tr} ${s.clearfix}`}>
                    <p className={s.fr}>
                        <span><small id="sl">{totalCount}</small> goods in total</span>
                        <span>Total:&nbsp;<small id="all">${totalCost}</small></span>
                        <Link to="/cart/confirm" className={s.count}>Commit</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartList;