"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    email: string;
    role: "ADMIN" | "USER";
}

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = () => {
            const storedUser = localStorage.getItem("admin_session");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        checkSession();
    }, []);

    const login = async (email: string, pass: string) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (email === "admin@autopremium.com" && pass === "admin123") {
            const loggedUser: User = { email, role: "ADMIN" };
            setUser(loggedUser);

            localStorage.setItem("admin_session", JSON.stringify(loggedUser));

            document.cookie = "admin_token=acceso_concedido; path=/; max-age=86400";

            router.push("/admin/dashboard");
            return { success: true };
        }

        return { success: false, error: "Credenciales incorrectas" };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("admin_session");
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"; // Destruimos la cookie

        router.push("/admin/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}