import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import './style/App.css';

const App = () => {

    const [connected, setConnected] = useState(false);
    const [ip, setIp] = useState("172.24.65.85");
    const [port, setPort] = useState(3306);
    const [userName, setUserName] = useState("root");
    const [passwd, setPasswd] = useState("20281128");
    const [dbOrder, setDbOrder] = useState("SELECT * FROM rider;");
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({});  // result when success
    const [errResult, setErrResult] = useState("");  // result when not success

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
            console.log('Axios result:', queryResult);

            let dbCmd = dbOrder.toLowerCase().slice(0, 4);

            // return value is a table
            if (dbCmd == 'sele' || dbCmd == 'desc' || dbCmd == 'show' || dbCmd == 'expl' || dbCmd == 'call') {
                try {
                    console.log('query result:', queryResult.data);
                    let errorMsg = queryResult.data['original']['sqlMessage'];
                    // console.log('Error msg:', errorMsg);
                    setErrResult(() => 'Error message: ' + errorMsg);
                    // console.log('Result in queryDB:', result);
                }
                catch (e) {  // MySQL Query Success
                    if (dbCmd == 'call') {
                        setErrResult(() => '');
                        setResult(() => ([queryResult.data]));
                    }
                    else {
                        setErrResult(() => '');
                        let tempData = queryResult.data;
                        if (tempData[0].hasOwnProperty('passwd')) {
                            for (let i = 0; i < tempData.length; i++) {
                                tempData[i]['passwd'] = '0x' + tempData[i]['passwd']['data'].map(num => num.toString(16).padStart(2, '0')).join('');
                            }
                        }
                        setResult(() => (tempData));
                        // useEffect(setResult(() => (queryResult.data)), [queryResult.data])
                    }
                }
            }
            else {
                console.log("typeof query result:", typeof(queryResult.data), queryResult.data);
                if (typeof(queryResult.data) == 'number') {
                    // Actually `INSERT` success, but return only `0`
                    setErrResult(() => 'Operating successful!');
                }
                else if (typeof(queryResult.data) == 'object') {
                    // query somehow failed
                    try {
                        let errorMsg1 = queryResult.data['parent']['sqlMessage'];
                        setErrResult(errorMsg1);
                    }
                    catch {
                        setErrResult(() => 'Operating successful!');
                    }
                }
                else {
                    // Unknown error
                    setErrResult(() => 'Unkonwn Error.');
                }
            }
        }
        catch (e) {  // Axios Error
            console.log('Axios error:', e);
            if (e['isAxiosError']) {
                setErrResult(() => e['message']);
            }
            else {
                setErrResult(() => 'Error unknown');
            }
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
                        <textarea 
                        type="text"
                        value={dbOrder}
                        placeholder="指令"
                        tyle={{resize: "both", width: "400px"}}
                        cols={1}
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
        // console.log('result before form:', result);
        // console.log('Err msg:', errResult);
        if (errResult) {
            return (
                <div className="form-container">
                    <p>{errResult}</p>
                </div>
            )
        }
        else {
            return (
                <div className="form-container">
                    {/* <p>{`查询结果：${JSON.stringify(result)}`}</p> */}
                    <Table striped bordered hover variant="dark">
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
    }

    // 实时监听result和errResult的变化
    useEffect(() => {}, [result, errResult]);

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