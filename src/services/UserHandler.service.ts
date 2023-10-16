import { BACKEND_URL } from "src/config/env";

interface SignUpData {
    email: string;
    password: string;
    name: string;
    role: string;
}

const BASE_URL = BACKEND_URL;

const apiService = {
    registerUser: async (data: SignUpData) => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response;
        } catch (error) {
            console.error("Error occurred during API call:", error);
            return null;
        }
    },
    loginUser: async (email: string, password: string) => {
        try {
            const response = await fetch(`${BASE_URL}/api/token/tokens`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response;
        } catch (error) {
            console.error("Error occurred during API call:", error);
            return null;
        }
    },
    updateToken: async (refreshToken: string) => {
        try {
            const response = await fetch(`${BASE_URL}/api/token/tokens/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Error occurred during API call:", error);
            return null;
        }
    },
    onLogOut: () => {
        localStorage.removeItem('authTokens');
        window.location.href = '/auth/signin/'
    },
    getUserData: async(token: string) => {
        const response = await fetch(`${BASE_URL}/api/user/me/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response;
    },

};

export default apiService;