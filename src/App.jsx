import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContext } from "./myContext";
import axios from "axios";
import './style/App.css';
// import Homepage from "./pages/homepage";
// import RenderLoginContainer from "./pages/login";
// import Signup from "./pages/signup";
// import Profile from "./pages/profile";
// import Menupage from "./pages/menu";
// import Orders from "./pages/orders";
// import NotFound from "./pages/notfound";
import { toast, Toaster } from "react-hot-toast";
import { 
    MailOutlined, 
    ProfileOutlined, 
    ShopOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    HomeOutlined,
    QrcodeOutlined
} from "@ant-design/icons";
import { FloatButton, Image, Menu, Spin } from "antd";

import baseUrl from "./url";
import qrcode from "./image/qr1.png";

// 使用lasy+Suspense方式动态import其他页面模块，防止chunk过大影响加载
const Homepage = lazy(() => import('./pages/homepage'));
const RenderLoginContainer = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const Profile = lazy(() => import('./pages/profile'));
const Menupage = lazy(() => import('./pages/menu'));
const Orders = lazy(() => import('./pages/orders'));
const NotFound = lazy(() => import('./pages/notfound'));


const App = () => {

    const [connected, setConnected] = useState(false);  // 检查数据库连接情况
    const { logedIn, setLogedIn } = useContext(MyContext);  // 检查登录情况

    const logout = async () => {
        setLogedIn(() => false);
        toast.success("退出成功！");
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('user');
    }

    // 菜单栏
    const items = [
        {
            label: (
                <a href="/">主页</a>
            ),
            key: 'home',
            icon: <HomeOutlined/>
        },
        {
          label: (
            <a href="/menu" target="_blank" rel="noopener noreferrer">
              菜单
            </a>
          ),
          key: 'menu',
          icon: <ShopOutlined />,
        },
        {
          label: (
            <a href="/orders" target="_blank" rel="noopener noreferrer">
              订单
            </a>
          ),
          key: 'orders',
          icon: <ProfileOutlined />,
          disabled: false,
        },
        logedIn && {
            label: (
                <a href="/profile" target="_blank" rel="noopener noreferrer">
                    个人中心
                </a>
            ),
            key: 'profile',
            icon: <UserOutlined/>
        },
        {
            label: (
                logedIn ? <a onClick={logout}>退出</a> : <a href="/login">登录</a>
            ),
            key: 'loginOrOut',
            icon: logedIn ? <LogoutOutlined/> : <LoginOutlined/>
        }
      ];

    // 刷新网页链接数据库
    useEffect(() => {
        if (localStorage['loginStatus']) {
            setLogedIn(() => localStorage['loginStatus']);
        }
        if (localStorage["user"]) {
            async function fetchUser() {
                try {
                    console.log(JSON.parse(localStorage['user']))
                    let queryUser = await axios.get(
                        baseUrl + '/api/getUser?id=' + JSON.parse(localStorage['user'])[0]['id']
                    );
                    if (queryUser.data['message'] === 'success') {
                        setConnected(() => true);
                        console.log(queryUser.data['userInfo'])
                        localStorage.setItem('user', JSON.stringify(queryUser.data['userInfo']));
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            if (localStorage["user"] == 'undefined') {
                localStorage.removeItem('user');
            }
            else {
                fetchUser();
            }
        }
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <header>
                        <div className="left">
                            <a className="title" href="/">快点外卖</a>
                            <p className="subtitle">您的外卖专家！😉</p>
                        </div>
                        <Menu mode="horizontal" items={items} theme={"light"} className="right" overflowedIndicator={<MenuUnfoldOutlined/>}/>
                        {/* {logedIn ? 
                        <button className="right" onClick={logout}>退出</button> :
                        <button className="right" onClick={() => window.location.href="/login"}>登录</button>
                        } */}
                    </header>
                </div>
                <Toaster/>

                <Router>
                    <Suspense fallback={<Spin tip="加载中..."/>}>
                        <Routes>
                        <Route exact path='/' element={<Homepage/>} />
                        <Route path="/login" element={<RenderLoginContainer/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/menu" element={<Menupage/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Suspense>
                </Router>

                <FloatButton tooltip={<Image src={qrcode} width={100} />} icon={<QrcodeOutlined />} />

                <div className="footer-container">
                    <MailOutlined style={{marginRight: 5}}/>
                    <a className="footer-text"
                        href="mailto:20281128@bjtu.edu.cn"
                    >联系邮箱</a>
                </div>
            </div>
        </div>
    );
}

export default App;