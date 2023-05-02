import React, { useState } from "react";

export const MyContext = React.createContext();

export const MyProvider = ({children}) => {
    const [isLogedIn, setIsLogedIn] = useState(false);

    return (
        <MyContext.Provider value={{isLogedIn, setIsLogedIn}}>
            {children}
        </MyContext.Provider>
    );
}