import React, {useEffect, useState} from 'react';
import s from "./index.module.css";
import {Link} from "react-router-dom";
import LeftMenu from "../../../common/user/LeftMenu";
import jia from "../../../assets/img/new/add.jpg"
import {Button, Modal, Form, Input, Radio, message, Popconfirm, Tag} from 'antd';
import axios from "axios";
import {Card, Col, Row} from 'antd';
import AddAddressForm from "./AddForm";
import EditAddressForm from "./EditForm";

function UserAddress(props) {
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [address, setAddress] = useState({});
    const [addressList, setAddressList] = useState([])
    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        axios.get(`/customers/${user_id}/address/`).then(res => {
            console.log(res.data.results)
            setAddressList(res.data.results)
        })
    }, [])

    const handleDelete = (id) => {
        const user_id = localStorage.getItem("user_id")
        return () => {
            axios.delete(`/customers/${user_id}/address/${id}`).then(() => {
                setAddressList(addressList.filter((item) => {
                    return item.id !== id
                }))
                message.info("Delete address successfully!")
            })
        }
    }

    return (
        <div>
            <div className={s.Bott}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <LeftMenu/>
                    <div className={`${s.you} ${s.fl}`}>
                        <h2>My address<Button className={s.fr} onClick={() => setAddVisible(true)}>Add new
                            address</Button>
                        </h2>

                        <div>
                            {
                                addressList.map((item) => {
                                    return (
                                        <div className="site-card-wrapper" key={item.id}>
                                            <Row>
                                                <Col span={24}>
                                                    <Card
                                                        title={
                                                            <div>{item.receiver_first_name + " " + item.receiver_last_name} , {item.county} &nbsp;&nbsp;&nbsp;
                                                                <Tag
                                                                    color="blue">{item.free_delivery ? "Free delivery" : ""}</Tag>
                                                            </div>}
                                                        bordered={true}
                                                    >
                                                        <p>{item.receiver_first_name + " " + item.receiver_last_name}</p>
                                                        <p>{item.receiver_phone_number}</p>
                                                        <p>{item.state}</p>
                                                        <p>{item.county}</p>
                                                        <p>{item.street}</p>
                                                        <p>{item.post_code}</p>
                                                        <Popconfirm
                                                            title="Are you sure to delete this address?"
                                                            onConfirm={handleDelete(item.id)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button danger>Delete</Button>
                                                        </Popconfirm>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Button onClick={() => {
                                                            setEditVisible(true)
                                                            setAddress(item)
                                                        }}>Edit</Button>
                                                    </Card>
                                                    <br/>
                                                    <br/>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <AddAddressForm visible={addVisible} setVisible={setAddVisible} addressList={addressList}
                            setAddressList={setAddressList}/>
            <EditAddressForm visible={editVisible} setVisible={setEditVisible} addressList={addressList}
                             setAddressList={setAddressList} address={address}/>
        </div>
    );
}

export default UserAddress;