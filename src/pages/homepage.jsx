import React from "react";

const Homepage = () => {
    return (
        <div className="form-container">
            <img alt="Homepage image" src="./src/home.png"/>
            <button onClick={() => window.location.href="/login"} className="cta-button connect-DB-button">
                登录
            </button>
        </div>
    )
}

export default Homepage;