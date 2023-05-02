import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import './style/App.css';
import Homepage from "./pages/homepage";
import { RenderLoginContainer, login, logout } from "./pages/login";
import Signup from "./pages/signup";

const App = () => {

    const [connected, setConnected] = useState(false);  // 检查数据库连接情况
    const [logedIn, setLogedIn] = useState(false);  // 检查登录情况

    const queryDB = async () => {
        try {
            const queryResult = await axios.post(
                'http://127.0.0.1:3000/queryDB',
                {queryData: dbOrder}
            );
            console.log('Axios result:', queryResult);

            let dbCmd = dbOrder.toLowerCase().slice(0, 4);

            // return value is a table
            if (dbCmd == 'sele' || dbCmd == 'desc' || dbCmd == 'show' || dbCmd == 'expl') {
                try {
                    console.log('query result:', queryResult.data);
                    let errorMsg = queryResult.data['original']['sqlMessage'];
                    // console.log('Error msg:', errorMsg);
                    setErrResult(() => 'Error message: ' + errorMsg);
                    // console.log('Result in queryDB:', result);
                }
                catch (e) {  // MySQL Query Success
                    setErrResult(() => '');
                    setResult(() => (queryResult.data));
                    // useEffect(setResult(() => (queryResult.data)), [queryResult.data])
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

    // 刷新网页链接数据库
    useEffect(() => {
        async function fetchDB() {
            try {
                let queryConnectDB = await axios.post(
                    'http://localhost:3000/connectDB',
                    {
                        url: "172.24.65.85",
                        port: 3306,
                        userName: "root",
                        passwd: "20281128"
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
        fetchDB();
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <header>
                        <div className="left">
                            <p className="title">快点外卖管理系统</p>
                            <p className="subtitle">您的外卖专家！😉</p>
                        </div>
                        {logedIn ? 
                        <button className="right" onClick={() => setLogedIn(() => false)}>退出</button> :
                        <button className="right" onClick={() => window.location.href="/login"}>登录</button>
                        }
                    </header>
                </div>

                <Router>
                    <Routes>
                    <Route exact path='/' element={<Homepage/>} />
                    <Route path="/login" element={<RenderLoginContainer/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    </Routes>
                </Router>

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