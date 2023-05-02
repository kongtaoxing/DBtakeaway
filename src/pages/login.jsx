import React, { useContext } from "react";
import { MyContext } from "../myContext";

const parentComponent = () => {
    const { logedIn, setLogedIn } = useContext(MyContext);
    return (
        <>
            <RenderLoginContainer logedIn={logedIn} setLogedIn={setLogedIn} />
            <login logedIn={logedIn} setLogedIn={setLogedIn} />
            <logout logedIn={logedIn} setLogedIn={setLogedIn} />
        </>
    );
};

const RenderLoginContainer = (props) => {
    return (
        <div>
            <p>Log in, please.</p>
        </div>
    )
}

const login = async (props) => {
    // 
}

const logout = async (props) => {
    // 
}

export default RenderLoginContainer;