import React, {useEffect, useRef, useState} from 'react';
import s from "./index.module.css";
import {Link} from "react-router-dom";
import LeftMenu from "../../../common/user/LeftMenu";
import code from "../../../assets/img/new/code.jpg"
import axios from "axios";
import {Button, Input, message} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function ChangePwd(props) {
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const handleNewPwd1Change = (e) => {
        setNewPassword1(e.target.value)
    }
    const handleNewPwd2Change = (e) => {
        setNewPassword2(e.target.value)
    }
    const handleOldPwdChange = (e) => {
        console.log(oldPassword)
        setOldPassword(e.target.value)
    }
    const handleChangePwd = () => {
        const user_id = localStorage.getItem("user_id")
        console.log(oldPassword)
        console.log(newPassword1)
        console.log(newPassword2)
        if (newPassword1 !== newPassword2) {
            message.error("New passwords do not match!")
            return
        }
        axios.post("/account/change_password", {
            "user_id": user_id,
            "password": newPassword1,
            "old_password": oldPassword,
        }).then(res => {
            console.log(res)
            if (res.data.id) {
                message.info("Change your password successfully!")
                setOldPassword("")
                setNewPassword1("")
                setNewPassword2("")
            } else {
                message.error("Cannot change your password. Please check your password.")
            }
        }, () => {
            message.error("Cannot change your password. Please check your password.")
        })
    }
    return (
        <div>
            <div className={s.Bott}>
                <div className={`${s.wrapper} ${s.clearfix}`}>
                    <LeftMenu/>
                    <div className={`${s.you} ${s.fl}`}>
                        <h2>Change password</h2>
                        <form action="#" method="get" className={s.remima}>
                            {/*<p><span>previous password：</span><input type="password" onChange={handleOldPwdChange.bind(this)}/></p>*/}
                            <p><span>previous password：</span><Input type={"password"} style={{width:"240px"}} onChange={handleOldPwdChange.bind(this)} value={oldPassword}/></p>
                            <p className={s.op}>input previous password</p>
                            <p><span>new password：</span><Input type={"password"} style={{width:"240px"}} onChange={handleNewPwd1Change.bind(this)} value={newPassword1}/></p>
                            <p className={s.op}>6-16 characters, need to use a combination of letters, numbers or
                                symbols, cannot use pure numbers, pure letters, pure symbols</p>
                            <p><span>repeat new password：</span><Input type={"password"} style={{width:"240px"}} onChange={handleNewPwd2Change.bind(this)} value={newPassword2}/></p>
                            <p className={s.op}>repeat new password</p>
                            <div style={{textAlign:"center"}}><Button danger={true} onClick={handleChangePwd}>Submit</Button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePwd;