import React, {useRef, useState} from 'react';
import s from "./index.module.css";
import {Link, useNavigate} from "react-router-dom";
import logoImg from "../../../assets/img/new/logo.png"
import {Button, message} from "antd";
import axios from "axios";
import {error} from "bfj/src/events";

function Login(props) {
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleTextChange = (e) => {
        setToken(e.target.value)
    }
    const handlePwdChange = (e) => {
        setPassword(e.target.value)
    }
    const handleLogin = () => {
        axios.post("/account/login", {
            "email": token,
            "phone_number": token,
            "password": password
        }).then(res => {
            console.log(res.data)
            localStorage.setItem("user_id", res.data.id)
            navigate(`/home`, {replace: true});
        }, () => {
            message.error("Wrong email/phone number or password")
        })
    }
    return (
        <div className={s.login}>
            <form action="#" method="post">
                <h1><Link to={"/home"}><img src={logoImg} style={{height: "70px", width: "130px"}} alt={""}/></Link>
                </h1>
                <div className={`${s.msgWarn} hide`}><b style={{fontSize: "15px"}}>Log in to enjoy for functions.</b>
                </div>
                <p><input type="text" name="" placeholder="email/phone number" onChange={handleTextChange.bind(this)}/>
                </p>
                <p><input type="password" name="" placeholder="password" onChange={handlePwdChange.bind(this)}/></p>
                <Button onClick={handleLogin}>Login</Button>
                <p className={s.txt}>
                    <input type={"checkbox"}/> <span style={{fontSize: "15px"}}>remember me</span>
                    <Link className={""} to={"/register"}>Register</Link>
                    <Link className={""} to={"/forget"}>Forget password？</Link>
                </p>
            </form>
        </div>

    );
}

export default Login;