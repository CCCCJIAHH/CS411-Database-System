import React, { useEffect, useState } from 'react';
import s from "./index.module.css";
import way01 from "../../../assets/img/temp/way01.jpg"
import order01 from "../../../assets/img/temp/order01.jpg"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form, Input, Radio, Popconfirm, message, Space, Row, Col, Card, List } from 'antd';
import VirtualList from 'rc-virtual-list';

function CartConfirm(props) {
    const [cartItemList, setCartItemList] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [shipping, setShipping] = useState(5)
    const navigate = useNavigate()
    const [finalCost, setFinalCost] = useState(0)
    const [payment, setPayment] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [status, setStatus] = useState(0)
    const [discount, setDiscount] = useState(0);
    


    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        if (!user_id) {
            navigate("/login", { replace: false })
            return
        }
        axios.get(`store/cartitems/?user_id=${user_id}`).then(res => {
            // console.log(res.data)
            setCartItemList(res.data)
            let cost = 0, count = 0
            res.data.forEach((item) => {
                cost += item.total_price
                count += item.quantity
            }, 0)
            
            setTotalCost(cost.toFixed(2))
            setShipping(5)
            setFinalCost(cost  + shipping);
        }, () => {
            message.error("Cannot get your shopping cart. Please try again later.")
        })
        setShipping(5);
    }, [])


    const onDeliveryChange = (value) => {
        console.log(value);
        // set value to delivery state
        setDelivery(value.target.value);
    }

    const onPaymentChange = (value) => {
        // set value to payment state
        console.log(value)
        setPayment(value.target.value);
    }

    const onStatusChange = (value) =>{
        console.log(value)
        setStatus(value.target.value)
    }

    const onConfirm = () => {
        console.log(delivery)
        console.log(payment)
        console.log(status)
        const user_id = localStorage.getItem("user_id")
        if (!user_id) {
            navigate("/login", { replace: false })
            return
        }
         axios.post(`store/orders/`,{
             "user_id": user_id}).then(res =>{
                axios.put(`store/orders/${res.data.id}/?user_id=${user_id}`, { data: { payment, delivery,status:1 } }).then((d) => {
             
                    console.log(d.data.status)
                    setDiscount(d.data.discount)
                    setFinalCost(d.data.total_price)
                    
                })
                 
             })
    }
        
    const [paymentList, setPaymentList] = useState([])
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm();
    const [addressList, setAddressList] = useState([])
    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        axios.get(`/customers/${user_id}/address/`).then(res => {
            // console.log(res.data.results)
            setAddressList(res.data.results)
        })
    }, [])
    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        axios.get(`/customers/${user_id}/payments/`).then(res => {
            // console.log(res.data)
            setPaymentList(res.data)
        })
    }, [])
    const changeAddress = (free_delivery) => {
        return () => {
            if (free_delivery) {
                if (shipping === 5) {
                    setShipping(0);
                    setFinalCost(finalCost - 5);
                }
            } else {
                if (shipping === 0) {
                    setShipping(5)
                    setFinalCost(finalCost + 5);
                }
            }
        }
    }

    return (
        <div className={`${s.order} ${s.cart} ${s.mt}`}>
            <div className={`${s.orderCon} ${s.wrapper} ${s.clearfix}`}>
                <div className={`${s.orderL} ${s.fl}`}>
                    <h3>Receiver information</h3>
                    <Row gutter={[16, 16]}>
                        {
                            addressList.map(item => {
                                return <Col span={12} key={item.id}>
                                    <Card title={item.receiver_first_name + " " + item.receiver_last_name}
                                        bordered={true}
                                        extra={<Button onClick={changeAddress(item.free_delivery)}>Use this
                                            address</Button>}>
                                        <p>{item.state + " " + item.county}</p>
                                        <p>{item.street}</p>
                                        <br />
                                        <p>{item.receiver_phone_number}</p>
                                        <p>{item.post_code}</p>
                                    </Card>
                                </Col>
                            })
                        }
                    </Row>

                    <h3>Payment<a href="#" className={s.fr} onClick={() => setVisible(true)}>Add payment</a></h3>
                    <div className={`${s.way} ${s.clearfix}`}>
                       
                        <Radio.Group onChange={onPaymentChange} value={payment}>

                            {
                                paymentList.map((item) => {
                                    const card = item.card_number;
                                    return <Radio.Button size={"large"} value={card}>{"****" + card.substring(card.length - 4)}</Radio.Button>
                                })
                            }

                        </Radio.Group>
                    </div>
                    <h3>Delivery</h3>
                    <div className={`${s.way} ${s.clearfix}`}>
                       
                        <Radio.Group onChange={onDeliveryChange} value={delivery}>
                            <Radio.Button size={"large"} value='Federal Express'>Federal Express</Radio.Button>
                            <Radio.Button size={"large"} value='UPS'>UPS</Radio.Button>
                            <Radio.Button size={"large"} value='USPS'>USPS</Radio.Button>
                        </Radio.Group>
                    </div>



                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={onConfirm}
                    >
                        <h3><a href="#" className={s.fr}><Button size={"large"}>Confirm</Button></a></h3>
                    </Popconfirm>


                    <br />
                    <br />
                </div>
                <div className={`${s.orderR} ${s.fr}`}>
                    <div className={s.msg}>
                        <h3>Order content<Link to={"/cart/list"} className={s.fr}>Go back to shopping cart</Link></h3>
                        {
                            cartItemList.map(item => {
                                return (
                                    <ul className={s.clearfix} key={item.id}>
                                        <li className={s.fl}>
                                            <img src={item.goods.image_url} />
                                        </li>
                                        <li className={s.fl}>
                                            <p>{item.goods.name}</p>
                                            <p>{item.goods.description}</p>
                                            <p>Amount：{item.quantity}</p>
                                        </li>
                                        <li className={s.fr}>${item.total_price}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                    <div className={s.tips}>
                        <p><span className={s.fl}>Goods payment：</span><span className={s.fr}>${totalCost}</span></p>
                        <p><span className={s.fl}>Discount：</span><span className={s.fr}>${discount}</span></p>
                        <p><span className={s.fl}>shipping：</span><span
                            className={s.fr}>${shipping}</span></p>
                    </div>
                    <div className={`${s.count} ${s.tips}`}>
                        <p><span className={s.fl}>Total：</span><span className={s.fr}>${finalCost}</span></p>
                    </div>
                    <Link to={"/cart/success"} className={s.pay}>Pay now</Link>
                </div>
            </div>


            <Modal
                visible={visible}
                title="Create a new payment"
                okText="Create"
                cancelText="Cancel"
                onCancel={() => setVisible(false)}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                        
                            const user_id = localStorage.getItem("user_id")
                            axios.post(`/customers/${user_id}/payments/`, {
                                "user": user_id,
                                "card_number": values.cardNumber + "",
                            }).then(res => {
                                if (res.data.id) {
                                    message.info("Add new payment successfully!")
                                    setPaymentList([res.data, ...paymentList])
                                    setVisible(false)
                                } else {
                                    message.error("Cannot add new payment")
                                }
                            }, () => {
                                message.error("Cannot add new payment")
                            })
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="cardNumber"
                        label="Card number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the card number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CartConfirm;