import React, { useState } from "react";

export const MyContext = React.createContext();

export const MyProvider = ({children}) => {
    const [logedIn, setLogedIn] = useState(false);
    const [menuItem, setMenuItem] = useState([]);

    return (
        <MyContext.Provider value={{logedIn, setLogedIn, menuItem, setMenuItem}}>
            {children}
        </MyContext.Provider>
    );
}