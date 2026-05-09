"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "admin@autopremium.com" && password === "admin123") {
            router.push("/admin/dashboard");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900">Admin<span className="text-blue-600">Panel</span></h1>
                    <p className="text-slate-500 mt-2 font-medium">Introduce tus credenciales de acceso</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="admin@autopremium.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
                        Entrar al Sistema
                    </button>
                </form>
            </div>
        </div>
    );
}