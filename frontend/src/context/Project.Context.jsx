import React, { createContext, useContext, useEffect, useState} from "react";
import {
    createProject, 
    listOfProject
} from "../api/Project.api";

import { getToken } from "../utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(getToken());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            if(!accessToken){
                setLoading(false);
                return;
            }
            setLoading(false);
        };
        initAuth();
    }, []);
}