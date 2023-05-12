import axios from "axios";
import React, { useContext, useState } from "react";
import  { toast, Toaster }  from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../myContext";

import baseUrl from "../url";

const RenderLoginContainer = () => {

    const { logedIn, setLogedIn } = useContext(MyContext);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwd, setPasswd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const hints = () => {
        return (
            <p>{errorMsg}</p>
        )
    }

    const login = async () => {
        try {
            const signinData = await axios.post(
                baseUrl + "/api/login",
                {
                    phoneNumber: phoneNumber,
                    passwd: passwd
                }
            );
            if (signinData.data['errorMsg'] == 'success') {
                setLogedIn(() => true);
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('user', JSON.stringify(signinData.data['user']));
                console.log(signinData.data['user']);
                toast.success("登录成功！正在跳转个人主页...");
                navigate('/profile');
            }
            else {
                toast.error(signinData.data['errorMsg']);
                setErrorMsg(() => signinData.data['errorMsg']);
            }
        }
        catch (e) {
            console.log(e);
            setErrorMsg(() => String(e))
        }
    }
    
    const logout = async () => {
        // 
    }    

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
            <button className="cta-button connect-DB-button" onClick={login}>登录</button>
            <Toaster/>
            {hints()}
        </div>
    )
}

export default RenderLoginContainer;