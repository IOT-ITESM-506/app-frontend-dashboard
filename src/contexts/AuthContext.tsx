import { createContext, useEffect, useReducer, ReactNode, useState } from "react";
import { BACKEND_URL } from "src/config/env";

import jwtDecode from "jwt-decode";

import { AuthContextType, AuthProviderProps, AuthTokens } from "src/types/context";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider(props: AuthProviderProps) {
    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null
    );
    const [user, setUser] = useState();
    const [navbarIsActive, setNavbarIsActive] = useState<boolean>(false);

    const authContext: AuthContextType = {
        onLogin: async (email: string, password: string) => {
            try {
                let response = await fetch(BACKEND_URL + '/api/token/tokens/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'email': email, 'password': password })
                })
                let data = await response.json();
                if (response.status === 200) {
                    setAuthTokens(data)
                    const jwt_decode_data: any = jwtDecode(data.access)
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    window.location.href = '/dashboard/home/'
                }
                return response;
            } catch (err) {
                throw new Error(`Error! status: ${err}`);
            }
        },
        onLogout: () => {
            setAuthTokens(null);
            localStorage.removeItem('authTokens');
            window.location.href = '/signin/identify'
        },
        updateToken: async () => {
            try {
                let response = await fetch(BACKEND_URL + '/api/token/tokens/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'refresh': authTokens.refresh })
                })
                let data = await response.json();
                setAuthTokens(data);
                localStorage.setItem('authTokens', JSON.stringify(data))
            } catch (err) {
                throw new Error(`Error! status: ${err}`);
            }
        },
        registerUser: async (data: any) => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/user/create/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "first_name": data.first_name,
                        "last_name": data.last_name,
                        "email": data.email,
                        "password": data.password,
                    }),
                });

                console.log(JSON.stringify({
                    "fist_name": data.first_name,
                    "last_name": data.last_name,
                    "email": data.email,
                    "password": data.password,
                }))

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response;
            } catch (error) {
                throw new Error(`Error! status: ${error}`);
            }
        },
        getUserData: async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/user/me/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
                const result = await response.json();
                setUser(result);
            } catch (err) {
                throw new Error(`Error! status: ${err}`);
            }
        },
        authTokens,
        user,
        navbarIsActive, setNavbarIsActive,
    };

    const renewToken = () => {
        authContext.updateToken();
    };

    useEffect(() => {
        if (authTokens) {
            authContext.getUserData();
            authContext.updateToken();

            const interval = setInterval(renewToken, 240000);

            return () => {
                clearInterval(interval);
            };
        }
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
}