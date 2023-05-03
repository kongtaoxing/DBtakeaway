import axios from "axios";
import React, { useState } from "react";

const Signup = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwd, setPasswd] = useState("");
    const [repasswd, setRepasswd] = useState("");
    const [registered, setRegistered] = useState(false);

    const signup = async () => {
        try {
            const signupData = await axios.post(
                "http://localhost:3000/api/signup",
                {
                    phoneNumber: phoneNumber,
                    passwd: passwd,
                }
            );
            if (signupData.data === 'success') {
                setRegistered(() => true);
            }
        }
        catch (e) {
            console.log(e);
        };
    }

    const hints = () => {
        console.log(phoneNumber, passwd, repasswd);
        // 密码需要包含字母数字和特殊字符，并且至少8位
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const safePasswd = regex.test(passwd);
        if (repasswd && passwd && passwd != repasswd) {
            return (
                <div>
                    <p>密码不匹配！</p>
                </div>
            );
        }
        else if (passwd && !safePasswd) {
            return (
                <p>密码需要包含字母数字和特殊字符，并且至少8位！</p>
            );
        }
        else if (registered == true) {
            return (
                <p>注册成功！</p>
            )
        }
        return (<div></div>);
    };

    return (
        <div className="form-container">
            <div className="form-group">
                <label htmlFor="input1">手机号：</label>
                <input 
                type="text" 
                id="input1"
                placeholder="" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)} 
                />
            </div><br></br>
            <div className="form-group">
                <label htmlFor="input2">密码：</label>
                <input 
                type="password" 
                placeholder="" 
                id="input2"
                value={passwd}
                onChange={e => setPasswd(e.target.value)}
                />
            </div><br></br>
            <div className="form-group">
                <label htmlFor="input3">确认密码：</label>
                <input 
                type="password" 
                placeholder="" 
                id="input3"
                value={repasswd}
                onChange={e => setRepasswd(e.target.value)}
                />
            </div><br></br>
            <button className="cta-button connect-DB-button" onClick={signup}>注册</button>
            {hints()}
        </div>
    )
}

export default Signup;