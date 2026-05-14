'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedToken = localStorage.getItem('jwt_token');
        if (savedToken) {
            Promise.resolve().then(() => {
                setToken(savedToken);
                setIsAuthenticated(true);
            });
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const query = `
                mutation {
                    login(username: "${username}", password: "${password}")
                }
            `;
            const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });

            const { data, errors } = await response.json();

            if (errors || !data?.login) {
                console.error("Error en login:", errors);
                return false;
            }

            const jwt = data.login;
            setToken(jwt);
            setIsAuthenticated(true);

            localStorage.setItem('jwt_token', jwt);
            document.cookie = `token=${jwt}; path=/; max-age=86400`; // 24 horas

            router.push('/admin/dashboard');
            return true;
        } catch (error) {
            console.error("Error de red durante el login", error);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('jwt_token');
        document.cookie = 'token=; path=/; max-age=0';

        window.location.href = '/login';
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
