import React, {useEffect, useState} from 'react';
import Footer from "../../common/Footer";
import s from "./index.module.css";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import pro from "../../assets/img/temp/pro01.jpg";
import HomeHeader from "../../common/Header/HomeHeader";
import axios from "axios";
import {Pagination} from "antd";

function Search(props) {
    let navigate = useNavigate();
    const [params] = useSearchParams();
    const keyword = params.getAll("keyword")[0]
    const page = params.getAll("page")[0]
    const [goodsList, setGoodsList] = useState([])
    const [total, setTotal] = useState(0)
    const pageSize = 20
    useEffect(() => {
        console.log(keyword)
        console.log(page)
        axios.get(`/store/goods/?search=${keyword}&page=${page}&page_size=${pageSize}`).then(res => {
            console.log(res.data)
            setGoodsList(res.data.results)
            setTotal(res.data.count)
        })
    }, [keyword, page])

    function changePage(pageNumber) {
        console.log('Page: ', pageNumber);
        navigate(`/search?keyword=${keyword}&page=${pageNumber}`);
    }
    return (
        <div>
            <HomeHeader/>
            <div className={s.schBox}>
                <ul className={`${s.wrapper} ${s.sch}`}>
                    <li>
                        <h4>price：</h4>
                        <a href="#">less than 5</a>
                        <a href="#">5 - 10</a>
                        <a href="#">10 - 20</a>
                        <a href="#">more than 20</a>
                    </li>
                    <li>
                        <h4>Brand：</h4>
                        <a href="#">Brand1</a>
                        <a href="#">Brand2</a>
                        <a href="#">Brand3</a>
                        <a href="#">Brand4</a>
                    </li>
                </ul>
            </div>
            <div className={s.address}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <Link to={"/home"}>Home page</Link>
                    <span>/</span>
                    <a className="on">Search “keyword”</a>
                </div>
            </div>
            <div className={s.current}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <h3 className={s.fl}>Search results</h3>
                    <div className={`${s.fr} ${s.choice}`}>
                        <p className={s.default}>order by</p>
                        <ul className={s.select}>

                        </ul>
                    </div>
                </div>
            </div>

            <ul className={`${s.proList} ${s.wrapper} ${s.clearfix}`}>
                {
                    goodsList.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={`/goods_detail?goods_id=${item.id}`}>
                                    <dl>
                                        <dt><img src={item.image_url}/></dt>
                                        <dd>{item.name}</dd>
                                        <dd>${item.price}</dd>
                                    </dl>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div style={{textAlign: "center"}}>
                <Pagination defaultCurrent={1} total={total} pageSize={pageSize} showSizeChanger={false} onChange={changePage}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Search;