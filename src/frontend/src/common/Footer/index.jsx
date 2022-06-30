import React from 'react';
import s from "./index.module.css";
import foot1 from "../../assets/img/new/foot1.png"
import foot2 from "../../assets/img/new/foot2.png"
import foot3 from "../../assets/img/new/foot3.png"
import foot4 from "../../assets/img/new/foot4.png"

function Footer(props) {
    return (
        <div className={s.footer}>
            <div className={s.top}>
                <div className={s.wrapper}>
                    <div className={s.clearfix}>
                        <div className={s.fl}><img src={foot1}/></div>
                        <span className={s.fl}>7 days no reason to return</span>
                    </div>
                    <div className={s.clearfix}>
                        <div className={s.fl}><img src={foot2}/></div>
                        <span className={s.fl}>15 days free exchange</span>
                    </div>
                    <div className={s.clearfix}>
                        <div className={s.fl}><img src={foot1}/></div>
                        <span className={s.fl}>Free shipping over 59</span>
                    </div>
                    <div className={s.clearfix}>
                        <div className={s.fl}><img src={foot2}/></div>
                        <span className={s.fl}>Mobile Featured Services</span>
                    </div>
                </div>
            </div>
            <p className={s.dibu}>To buy © 2022 All rights reserved Fake News Team<br/>
                Illegal and bad information reporting telephone: 200-200-2200, the data listed on this website, unless otherwise specified, all data are from the laboratory test of our team</p>
        </div>
    );
}

export default Footer;