import React, {useEffect, useState} from "react";
import mysql from "mysql";
import './App.css';

const App = () => {

    const [connected, setConnected] = useState(false);
    const [ip, setIp] = useState("");
    const [port, setPort] = useState();
    const [userName, setUserName] = useState("");
    const [passwd, setPasswd] = useState("");

    const connectDB = async () => {
        try {
            const connection = mysql.createConnection({
                host: ip,
                user: userName,
                password: passwd,
                database: `orders`
            });
            connection.connect();
        }
        catch (e) {
            console.log(e);
        }
    }

    const renderNotConnectedContainer = () => {
        return (
            <div>
                <div className="form-container">
                    <div className="first-row">
                        <input 
                        type="text"
                        value={ip}
                        placeholder="数据库IP地址"
                        onChange={e => setIp(e.target.value)}
                        />
                        <input 
                        type="text"
                        value={port}
                        placeholder="端口号"
                        onChange={e => setPort(e.target.value)}
                        />
                    </div>
                    <div className="first-row">
                        <input 
                        type="text"
                        value={userName}
                        placeholder="用户名"
                        onChange={e => setUserName(e.target.value)}
                        />
                        <input 
                        type="text"
                        value={passwd}
                        placeholder="密码"
                        onChange={e => setPasswd(e.target.value)}
                        />
                    </div>

                </div>
                <div className="connect-DB-container">
                    <button className="cta-button connect-DB-button" onClick={connectDB}>
                        连接数据库
                    </button>
                </div>
            </div>
        )
    };

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <header>
                        <div className="left">
                            <p className="title">快点外卖管理系统</p>
                            <p className="subtitle">您的外卖专家！😉</p>
                        </div>
                        <div className="right">
                            <p>登录</p>
                        </div>
                    </header>
                </div>

                {!connected && renderNotConnectedContainer()}

                <div className="footer-container">
                    <a className="footer-text"
                        href="mailto:20281128@bjtu.edu.cn"
                    >联系邮箱</a>
                </div>
            </div>
        </div>
    );
}

export default App;