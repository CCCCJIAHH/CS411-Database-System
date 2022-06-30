import React, {useEffect, useState} from 'react';
import s from "./index.module.css";
import {Link} from "react-router-dom";
import logo from "../../../assets/img/new/logo.png"
import axios from "axios";
import {Input} from 'antd';

const {Search} = Input;

function UserHeader(props) {
    const [categoryList, setCategoryList] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        console.log("category")
        axios.get(`/store/categories/`).then(res => {
            console.log(res.data)
            setCategoryList(res.data.results)
        })
    }, [])
    return (
        <div className={`${s.head}`}>
            <div className={`${s.wrapper} ${s.clearfix}`}>
                <div className={s.clearfix} id="top">
                    <h1 className={s.fl}><Link to={"/home"}><img style={{height: "50px", width: "100px"}} src={logo}
                                                                 alt={""}/></Link></h1>
                    <div className={`${s.fr} ${s.clearfix}`} id="top1">
                        <form action="#" method="get" className={s.fl}>
                            <Search placeholder="input search text" allowClear bordered={false} style={{width: 200}}/>
                        </form>
                    </div>
                </div>
                <ul className={s.clearfix} id="bott">
                    <li><Link to={"/home"}>Home page</Link></li>
                    <li><Link to={"/goods?category_id=0&page=1"}>All Goods</Link></li>
                    {
                        categoryList.map((item) => {
                            return <li key={item.id}><Link
                                to={`/goods?category_id=${item.id}&page=1`}>{item.name}</Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default UserHeader;