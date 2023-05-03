import React, { useState } from "react";

export const MyContext = React.createContext();

export const MyProvider = ({children}) => {
    const [logedIn, setLogedIn] = useState(false);

    return (
        <MyContext.Provider value={{logedIn, setLogedIn}}>
            {children}
        </MyContext.Provider>
    );
}