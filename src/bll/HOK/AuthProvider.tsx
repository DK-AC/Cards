import React, {createContext, ReactChildren, useContext, useState} from 'react';
import {useAppSelector} from "../store";

export const AuthContext:any = createContext(null)

export const AuthProvider = ({children}:any) => {
    const [user, setUser] =useState(null)
    const signIn= (newUser:any, cb:any)=>{
        setUser(newUser)
        cb()
    }
    const signOut= (cb:any)=>{
        setUser(null)
        cb()
    }
    const value:any={user, signIn, signOut}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    return useContext(AuthContext)
}