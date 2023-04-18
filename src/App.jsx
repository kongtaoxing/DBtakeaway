import React, {useEffect, useState} from "react";
import './App.css';

const App = () => {
    // 
    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <header>
                        <div className="left">
                            <p className="title">快点外卖</p>
                            <p className="subtitle">您的外卖专家！😉</p>
                        </div>
                        <div className="right">
                            <p>登录</p>
                        </div>
                    </header>
                </div>

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