import { ReactNode } from 'react';

interface AuthTokens {
    access: string;
    refresh: string;
}

interface AuthContextType {
    registerUser: (name: string, email: string,) => void;
    onLogin: (email: string, password: string) => void;
    updateToken: (refreshToken: string) => void;
    onLogout: () => void;
    getUserData: (token: string) => void;
    authTokens?: AuthTokens;
    user?: any;
}

interface AuthProviderProps {
    children: ReactNode;
}

export type {
    AuthContextType,
    AuthTokens,
    AuthProviderProps,
}