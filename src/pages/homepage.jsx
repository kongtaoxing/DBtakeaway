import React, { useContext } from "react";
import { MyContext } from "../myContext";

const Homepage = () => {

    const { logedIn, setLogedIn } = useContext(MyContext);
    return (
        <div className="form-container">
            <img alt="Homepage image" src="./src/home.png"/>
            {
                logedIn 
                ?
                <button onClick={null} className="cta-button connect-DB-button">
                    Sonta-Ha!
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