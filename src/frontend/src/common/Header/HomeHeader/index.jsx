import React, {useEffect, useState} from 'react';
import s from "./index.module.css";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../../assets/img/new/logo.png"
import userLogo from "../../../assets/img/new/grzx.png"
import cartLogo from "../../../assets/img/gwc.png"
import axios from "axios";
import {Input} from 'antd';

const {Search} = Input;

function HomeHeader(props) {
    const [categoryList, setCategoryList] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("user_id")) setIsLogin(true)
        else setIsLogin(false)
        axios.get(`/store/categories/`).then(res => {
            setCategoryList(res.data.results)
        })
    }, [])
    const handleLogout = () => {
        localStorage.removeItem("user_id")
        setIsLogin(false)
    }
    return (
        <div className={s.head}>
            <div className={`${s.wrapper} ${s.clearfix}`}>
                <div className={s.clearfix} id="top">
                    <h1 className={s.fl}><Link to={"/home"}><img style={{height: "75px", width: "150px"}}
                                                                 src={logo}/></Link></h1>
                    <div className={`${s.fr} ${s.clearfix}`} id="top1">
                        <p className={s.fl}>
                            {isLogin ?
                                <Link to={"/home"} onClick={handleLogout}>Login
                                    out</Link> :
                                <>
                                    <Link to={"/login"}>Login</Link>
                                    <Link to={"/register"}>Register</Link>
                                </>
                            }
                        </p>
                        <form action="#" method="get" className={s.fl}>
                            <Search placeholder="input search text" allowClear bordered={false} style={{width: 180}}
                                    onSearch={(value) => navigate(`/search?keyword=${value}&page=1`)}/>
                        </form>
                        <div className={`${s.btn} ${s.fl} ${s.clearfix}`}>
                            <Link to={isLogin ? "/user/index" : "/login"}><img src={userLogo}/></Link>
                            <Link to={isLogin ? "/cart/list" : "/login"}><img src={cartLogo}/></Link>
                        </div>
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

export default HomeHeader;