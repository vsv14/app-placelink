import { createContext } from "react";



function noop(){}


export const AuthContext = createContext({
    userName: null,
    token_a: null,
    token_ref: null,
    
    login: noop,
    logout: noop,
    wasAuth: false
})