import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal} from "antd";
import axios from "axios";

function EditAddressForm(props) {
    const [form] = Form.useForm();
    const visible = props.visible
    const setVisible = props.setVisible
    const addressList = props.addressList
    const setAddressList = props.setAddressList
    const address = props.address
    useEffect(() => {
        console.log(address)
    })
    return (
        <Modal
            visible={visible}
            title="Edit address"
            okText="Edit"
            cancelText="Cancel"
            onCancel={() => setVisible(false)}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        const user_id = localStorage.getItem("user_id")
                        axios.patch(`/customers/${user_id}/address/${address.id}/`, {
                            "receiver_first_name": values.firstName + "",
                            "receiver_last_name": values.lastName + "",
                            "state": values.state + "",
                            "county": values.county + "",
                            "street": values.street + "",
                            "post_code": values.postCode + "",
                            "receiver_phone_number": values.receiver_phone_number + "",
                        }).then(res => {
                            if (res.data.id) {
                                message.info("Edit your address successfully!")
                                axios.get(`/customers/${user_id}/address/`).then(res => {
                                    console.log(res.data.results)
                                    setAddressList(res.data.results)
                                })
                                setVisible(false)
                            } else {
                                message.error("Cannot edit your address")
                            }
                        }, () => {
                            message.error("Cannot edit your address")
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
                    initialValue={address.receiver_first_name}
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
                    initialValue={address.receiver_last_name}
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
                    initialValue={address.state}
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
                    initialValue={address.county}
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
                    initialValue={address.street}
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
                    initialValue={address.post_code}
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
                    initialValue={address.receiver_phone_number}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditAddressForm;