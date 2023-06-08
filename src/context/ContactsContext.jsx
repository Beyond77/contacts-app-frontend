import { createContext, useEffect, useState } from "react";


export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {

    const [ token, setToken ] = useState("");
    const [ uid, setUid ] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    return (
        <ContactsContext.Provider value={{token, setToken, uid, setUid}}>
            { children }
        </ContactsContext.Provider>
    )
};
