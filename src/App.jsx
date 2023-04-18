import React, {useEffect, useState} from "react";
import './App.css';

const App = () => {

    const [connected, setConnected] = useState(false);

    const connectDB = async () => {
        // 
    }

    const renderNotConnectedContainer = () => (
        <div className="connect-DB-container">
            <button className="cta-button connect-DB-button" onClick={connectDB}>
                连接数据库
            </button>
        </div>
    );

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

                {!connected && renderNotConnectedContainer}

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