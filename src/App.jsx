import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContext } from "./myContext";
import axios from "axios";
import './style/App.css';
import Homepage from "./pages/homepage";
import RenderLoginContainer from "./pages/login";
import Signup from "./pages/signup";

const App = () => {

    const [connected, setConnected] = useState(false);  // 检查数据库连接情况
    const { logedIn, setLogedIn } = useContext(MyContext);  // 检查登录情况

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
                            <a className="title" href="/">快点外卖管理系统</a>
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