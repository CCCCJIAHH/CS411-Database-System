import React, {useState} from 'react';
import {Form, Input, message, Modal} from "antd";
import axios from "axios";

function AddAddressForm(props) {
    const [form] = Form.useForm();
    const visible = props.visible
    const setVisible = props.setVisible
    const addressList = props.addressList
    const setAddressList = props.setAddressList
    return (
        <Modal
            visible={visible}
            title="Create a new address"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => setVisible(false)}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        console.log(values.receiver_phone_number)
                        const user_id = localStorage.getItem("user_id")
                        axios.post(`/customers/${user_id}/address/`, {
                            "receiver_first_name": values.firstName + "",
                            "receiver_last_name": values.lastName + "",
                            "state": values.state + "",
                            "county": values.county + "",
                            "street": values.street + "",
                            "post_code": values.postCode + "",
                            "receiver_phone_number": values.receiver_phone_number + "",
                            "user": user_id
                        }).then(res => {
                            if (res.data.id) {
                                message.info("Add new address successfully!")
                                setAddressList([res.data, ...addressList])
                                setVisible(false)
                            } else {
                                message.error("Cannot add new address")
                            }
                        }, () => {
                            message.error("Cannot add new address")
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
                    label="first name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your first name",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="last name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your last name",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="state"
                    name="state"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your state",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="county"
                    name="county"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your county",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="street"
                    name="street"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your street",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="post code"
                    name="postCode"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your post code",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="receiver phone number"
                    name="receiver_phone_number"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your phone number",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>

    );
}

export default AddAddressForm;