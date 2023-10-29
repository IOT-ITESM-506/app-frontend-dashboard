import { createContext, useEffect, useReducer, ReactNode, useState } from "react";
import { BACKEND_URL } from "src/config/env";

import jwtDecode from "jwt-decode";

import { AuthContextType, AuthProviderProps, AuthTokens } from "src/types/context";
import { IGreenhouse } from "src/types/Greenhouse";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider(props: AuthProviderProps) {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null);
    const [user, setUser] = useState();
    const [navbarIsActive, setNavbarIsActive] = useState<boolean>(false);

    const [greenhouses, setGreenhouses] = useState<IGreenhouse[]>([
        {
            name: 'Organic Greens Hub',
            location: 'Sunny Valley, CA',
            size: 120,
            description: 'A modern greenhouse specializing in organic vegetables.',
            logo: 'https://images.pexels.com/photos/1459497/pexels-photo-1459497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            records: [
                {
                    timestamp: '2023-01-01T12:00:00',
                    temperature: 26.5,
                    humidity: 65,
                    luminosity: 5500,
                    CO2_level: 420,
                    soil_moisture: 0.6,
                    pH: 6.2,
                    nutrient_level: 220,
                },
            ],
        },
        {
            name: 'Floral Harmony Garden',
            location: 'Mountain View, CO',
            size: 180,
            description: 'A family-owned greenhouse with a focus on flowers and herbs.',
            logo: 'https://images.pexels.com/photos/1093216/pexels-photo-1093216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            records: [
                {
                    timestamp: '2023-02-05T15:45:00',
                    temperature: 22.0,
                    humidity: 50,
                    luminosity: 4800,
                    CO2_level: 400,
                    soil_moisture: 0.5,
                    pH: 6.8,
                    nutrient_level: 190,
                },
            ],
        },
        {
            name: 'Sustainable Innovations Lab',
            location: 'Coastal Farm, OR',
            size: 250,
            description: 'An experimental greenhouse researching sustainable practices.',
            logo: 'https://images.pexels.com/photos/399969/pexels-photo-399969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            records: [
                {
                    timestamp: '2023-03-10T09:30:00',
                    temperature: 28.0,
                    humidity: 70,
                    luminosity: 6000,
                    CO2_level: 450,
                    soil_moisture: 0.7,
                    pH: 6.0,
                    nutrient_level: 200,
                },
                {
                    timestamp: '2023-03-12T11:15:00',
                    temperature: 25.5,
                    humidity: 65,
                    luminosity: 5800,
                    CO2_level: 430,
                    soil_moisture: 0.6,
                    pH: 6.5,
                    nutrient_level: 210,
                },
            ],
        },
    ]);


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
            localStorage.clear();
            window.location.href = '/auth/signin/'
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
        greenhouses,
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