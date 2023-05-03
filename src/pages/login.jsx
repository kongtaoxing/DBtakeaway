import axios from "axios";
import React, { useContext, useState } from "react";
import { MyContext } from "../myContext";

const RenderLoginContainer = () => {

    const { logedIn, setLogedIn } = useContext(MyContext);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwd, setPasswd] = useState("");

    const login = async () => {
        try {
            const signinData = await axios.post(
                "http://localhost:3000/api/login",
                {
                    phoneNumber: phoneNumber,
                    passwd: passwd
                }
            );
            if (signinData.data == 'success') {
                setLogedIn(true);
                console.log(logedIn);
            }
        }
        catch (e) {
            console.log(e);
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
        </div>
    )
}

export default RenderLoginContainer;