import React, { useContext } from "react";
import { MyContext } from "../myContext";

const Homepage = () => {

    const { logedIn, setLogedIn } = useContext(MyContext);
    return (
        <div className="form-container">
            <img alt="Homepage image" src="./src/home.png"/>
            {
                logedIn ?
                <button>Sonta-Ha!</button> :
                <button onClick={() => window.location.href="/login"} className="cta-button connect-DB-button">
                登录
                </button>
            }
        </div>
    )
}

export default Homepage;