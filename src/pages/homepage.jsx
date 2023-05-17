import React, { useContext } from "react";
import { FireTwoTone } from "@ant-design/icons"
import { MyContext } from "../myContext";
import homeImage from "/src/image/home.png";

const Homepage = () => {

    const { logedIn, setLogedIn } = useContext(MyContext);
    return (
        <div className="form-container">
            <img alt="Homepage image" src={homeImage} style={{paddingBottom: 20}}/>
            {
                logedIn 
                ?
                <button onClick={() => window.location.href="/menu"} className="cta-button connect-DB-button">
                    <FireTwoTone twoToneColor="red" spin={true}/>热门菜品
                </button> 
                :
                <div>
                    <button 
                    onClick={() => window.location.href="/login"} 
                    className="cta-button connect-DB-button"
                    >
                        登录
                    </button>
                    <button 
                    onClick={() => window.location.href="/signup"} 
                    className="cta-button connect-DB-button"
                    >
                        注册
                    </button>
                </div>
            }
        </div>
    )
}

export default Homepage;