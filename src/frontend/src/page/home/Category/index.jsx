import React, {useEffect, useState} from 'react';
import s from "./index.module.css";
import banner from "../../../assets/img/temp/banner1.jpg"
import {Link} from "react-router-dom";
import pro from "../../../assets/img/temp/pro01.jpg";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {Pagination} from 'antd';
import {useNavigate} from "react-router-dom";
import {Menu, Dropdown, Button, Space} from 'antd';
import {DownOutlined} from "@ant-design/icons";
import {Select} from 'antd';

const {Option} = Select;

function Category(props) {
    let navigate = useNavigate();
    const [goodsList, setGoodsList] = useState([])
    const [params] = useSearchParams();
    const category_id = params.getAll("category_id")[0]
    const page = params.getAll("page")[0]
    const order = params.getAll("ordering")[0]
    const [total, setTotal] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const page_size = 20

    // 接收search参数
    useEffect(() => {
        if (category_id === "0") {
            axios.get(`/store/goods/?page=${page}&page_size=${page_size}&ordering=${order}`).then(res => {
                setGoodsList(res.data.results)
                console.log(res.data.results)
                setTotal(res.data.count)
            })
        } else {
            axios.get(`/store/goods/?category_id=${category_id}&page=${page}&page_size=${page_size}&ordering=${order}`).then(res => {
                setGoodsList(res.data.results)
                console.log(res.data.results)
                setTotal(res.data.count)
            })
        }
    }, [category_id, page, order])

    function changePage(page_number) {
        console.log('Page: ', page_number);
        setPageNumber(page_number)
        navigate(`/goods?category_id=${category_id}&page=${page_number}&ordering=${order}`);
    }

    return (
        <div>
            <div className={s.address}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <Link to={"/home"}>Home page</Link>
                    <span>/</span>
                    <Link to={"/goods"} className="on">category</Link>
                </div>
            </div>

            <div className={s.current}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <h3 className={s.fl}>category</h3>
                    <div className={`${s.fr}`}>
                        <Select defaultValue="Order by" style={{width: 120}}
                                onChange={(value) => navigate(`/goods?category_id=${category_id}&page=${pageNumber}&ordering=${value}`)}>
                            <Option value="price">Price: Low to High </Option>
                            <Option value="-price">Price: High to Low </Option>
                            <Option value="sales">Sales: Low to High </Option>
                            <Option value="-sales">Sales: High to Low </Option>
                            <Option value="">default</Option>
                        </Select>
                    </div>
                </div>
            </div>

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
            <div style={{textAlign: "center"}}>
                <Pagination defaultCurrent={1} total={total} pageSize={page_size} showSizeChanger={false}
                            onChange={changePage}/>
            </div>
        </div>
    );
}

export default Category;