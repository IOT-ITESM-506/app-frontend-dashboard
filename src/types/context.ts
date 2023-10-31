import { ReactNode } from "react";

interface AuthTokens {
    access: string;
    refresh: string;
}

interface AuthContextType {
    onLogin: (email: string, password: string) => void;
    onLogout: () => void;
    updateToken: () => void;
    getUserData: () => void;
    registerUser: (data: any) => void;

    getGreenhouses: () => void;
    getAlerts: () => void;
    getGreenhouseByName: (name: string) => Promise<any>;
    registerGreenhouse: (data: any) => void;
    

    authTokens?: AuthTokens;
    user?: any;

    navbarIsActive: boolean;
    setNavbarIsActive: (value: boolean) => void;
    greenhouses: any;
    alerts: any;
}

interface AppContextType {
    onChangeSelectedGreenhouse: (greenhouse: any) => void;
    selectedGreenhouse: any;
}

interface AppProviderProps {
    children: ReactNode;
}


interface AuthProviderProps {
    children: ReactNode;
}

export type {
    AuthContextType,
    AuthTokens,
    AuthProviderProps,
    AppContextType,
    AppProviderProps
}