import { createContext, useEffect, useState } from "react";

import { AuthContextType, AuthProviderProps, AuthTokens } from "src/types/context";
import apiService from "src/services/UserHandler.service";

import jwtDecode from "jwt-decode";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider(props: AuthProviderProps) {
    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null
    )
    const [user, setUser] = useState()

    const authContext: AuthContextType = {
        registerUser: async(data: any) => {
            const response = await apiService.registerUser(data);
            return response;
        },
        onLogin: async(email: string, password: string) => {
            const response = await apiService.loginUser(email, password);
            if (response) {
                setAuthTokens(response);
                localStorage.setItem('authTokens', JSON.stringify(response));
            }
            return response;
        },
        updateToken: async(refreshToken: string) => {
            const response = await apiService.updateToken(refreshToken);
            if (response) {
                setAuthTokens(response);
                localStorage.setItem('authTokens', JSON.stringify(response));
            }
            return response;
        },
        onLogout: () => apiService.onLogOut(),
        getUserData: async(token: string) => {
            const response = await apiService.getUserData(token);
            return response;
        },
        authTokens,
        user
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
}