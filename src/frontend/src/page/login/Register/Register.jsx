import React, {useState} from 'react';
import s from "./index.module.css";
import logoImg from "../../../assets/img/new/logo.png"
import codeImg from "../../../assets/img/new/code.jpg"
import {Link, useNavigate} from "react-router-dom";
import {Button, message} from "antd";
import {Select} from 'antd';
import axios from "axios";

const {Option} = Select;

function Register(props) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [gender, setGender] = useState("")
    const navigate = useNavigate()
    const handleNameChange = (e) => {
        setUsername(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const handlePwdChange = (e) => {
        setPassword(e.target.value)
    }
    const handlePwd2Change = (e) => {
        setPassword2(e.target.value)
    }
    const handleGenderChange = (value) => {
        setGender(value)
    }
    const handleRegister = () => {
        let valid = true
        if (!username || !phone || !email || !password || !password2) {
            message.error("Please fill all blanks.")
            return
        }
        axios.get(`/account/register_check?email=${email}&phone_number=${phone}`).then(res => {
            console.log(res.data)
            if (res.data.count > 0) {
                message.error("Email or phone number already exists!")
                valid = false
            }
        })
        if (!valid) return
        axios.post("/account/register", {
            "name": username,
            "password": password,
            "password2": password2,
            "phone_number": phone,
            "email": email,
            "gender": gender,
        }).then(res => {
            console.log(res.data)
            localStorage.setItem("user_id", res.data.id)
            navigate(`/home`, {replace: true});
        }, () => {
            message.error("Register failed, try again later.")
        })
    }
    return (
        <div className={s.reg}>
            <form action="#" method="post">
                <h1><Link to={"/home"}><img style={{height: "70px", width: "130px"}} src={logoImg} alt={""}/></Link>
                </h1>
                <p><b style={{fontSize: "15px"}}>Register</b></p>
                <p><input type="text" name="" placeholder="Please enter your username"
                          onChange={handleNameChange.bind(this)}/></p>
                <p><input type="text" name="" placeholder="Please enter your email"
                          onChange={handleEmailChange.bind(this)}/></p>
                <p><input type="text" name="" placeholder="Please enter your phone number"
                          onChange={handlePhoneChange.bind(this)}/></p>
                <p><input type="password" name="" placeholder="Please enter your password"
                          onChange={handlePwdChange.bind(this)}/></p>
                <p><input type="password" name="" placeholder="Please confirm your password"
                          onChange={handlePwd2Change.bind(this)}/></p>
                Select your gender: &nbsp;<Select defaultValue="default" style={{width: 120}}
                                                  onChange={handleGenderChange}>
                <Option value="1">Male</Option>
                <Option value="2">Female</Option>
            </Select><br/><br/>
                <Button onClick={handleRegister}>Register</Button>
                <p className={`${s.txtL} ${s.txt}`}>By completing this registration, you agree to our <a href="#">
                    Terms of Use and Privacy Policy
                </a></p>

                <p className={s.txt}><Link to={"/login"}>Already have an account, click here to log in</Link></p>
            </form>
        </div>
    );
}

export default Register;