import React, {useEffect, useState} from "react";
// import mysql from 'mysql2';
// import { Sequelize } from "sequelize";
import './App.css';

const App = () => {

    const [connected, setConnected] = useState(false);
    const [ip, setIp] = useState("");
    const [port, setPort] = useState();
    const [userName, setUserName] = useState("");
    const [passwd, setPasswd] = useState("");
    const [dbOrder, setDbOrder] = useState("");

    const connectDB = async () => {
        try {
            // const connection = new Sequelize(
            //     'orders',
            //     userName,
            //     passwd,
            //     {
            //         host: ip,
            //         port: port,
            //         dialect: 'mysql'
            //     }
            // );
            // try {
            //     await connection.authenticate();
            //     console.log('Connection has been established successfully.');
            //   } catch (error) {
            //     console.error('Unable to connect to the database:', error);
            //   }
            // const connection = mysql.createConnection({
            //     host: ip,
            //     user: userName,
            //     password: passwd,
            //     database: `orders`
            // });
            // connection.connect();
            setConnected(() => true);
        }
        catch (e) {
            console.log(e);
        }
    }

    const disconnectDB = async () => {
        setConnected(() => false);
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
                        type="password"
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

    const renderConnectedContainer = () => {
        return (
            <div>
                <div className="form-container second-row">
                    <p>请输入数据库指令：</p>
                    <div>
                        <input 
                        type="text"
                        value={ip}
                        placeholder="指令"
                        onChange={e => setIp(e.target.value)}
                        />
                    </div>
                </div>
                <div className="connect-DB-container">
                    <button className="cta-button connect-DB-button" onClick={null}>
                        开始查询
                    </button>
                </div>
            </div>
        );
    }

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
                            <button onClick={disconnectDB}>登录</button>
                        </div>
                    </header>
                </div>

                {!connected && renderNotConnectedContainer()}
                {connected && renderConnectedContainer()}

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