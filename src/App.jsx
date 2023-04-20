import React, { useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import './style/App.css';

const App = () => {

    const [connected, setConnected] = useState(false);
    const [ip, setIp] = useState("");
    const [port, setPort] = useState();
    const [userName, setUserName] = useState("");
    const [passwd, setPasswd] = useState("");
    const [dbOrder, setDbOrder] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({});

    const connectDB = async () => {
        try {
            let queryConnectDB = await axios.post(
                'http://localhost:3000/connectDB',
                {
                    url: ip,
                    port: port,
                    userName: userName,
                    passwd: passwd
                }
            );
            if (queryConnectDB.data === 'connected') {
                setConnected(() => true);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const disconnectDB = async () => {
        setConnected(() => false);
        setShowResult(() => false);
    }

    const queryDB = async () => {
        try {
            const queryResult = await axios.post(
                'http://127.0.0.1:3000/queryDB',
                {queryData: dbOrder}
            );
            console.log(typeof(queryResult.data));
            setResult(() => queryResult.data);
        }
        catch (e) {
            setResult(() => e);
        }
        setShowResult(() => true);
    }

    // 连接框
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

    // 查询框
    const renderConnectedContainer = () => {
        return (
            <div className="form-container">
                <div className="second-row">
                    <p className="simple-text">请输入数据库指令：</p>
                    <div>
                        <input 
                        type="text"
                        value={dbOrder}
                        placeholder="指令"
                        onChange={e => setDbOrder(e.target.value)}
                        />
                    </div>
                </div>
                <div className="connect-DB-container">
                    <button className="cta-button connect-DB-button" onClick={queryDB}>
                        开始查询
                    </button>
                </div>
            </div>
        );
    }

    // 结果显示
    const renderResultContainer = () => {
        return (
            <div className="form-container">
                {/* <p>{`查询结果：${JSON.stringify(result)}`}</p> */}
                <Table className="table">
                    <thead>
                        <tr>
                        {Object.keys(result[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((item) => (
                        <tr key={item.id}>
                            {Object.keys(item).map((key) => (
                                <td key={key}>{item[key]}</td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        )
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
                        {connected ? 
                        <button className="right" onClick={disconnectDB}>退出</button> :
                        <button className="right" onClick={connectDB}>登录</button>
                        }
                    </header>
                </div>

                {!connected && renderNotConnectedContainer()}
                {connected && renderConnectedContainer()}
                {showResult && renderResultContainer()}

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