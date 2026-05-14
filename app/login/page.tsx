'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const success = await login(username, password);

        if (!success) {
            setError(true);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-slate-900">
            {/* IMAGEN DE FONDO A PANTALLA COMPLETA */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Sport Car"
                    className="w-full h-full object-cover opacity-60 scale-105"
                />
                {/* Degradado para oscurecer los bordes y leer bien el texto */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/30 to-slate-900/90"></div>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="relative z-10 w-full flex">

                {/* TEXTO INSPIRACIONAL (LADO IZQUIERDO) */}
                <div className="hidden md:flex w-1/2 flex-col justify-center px-12 lg:px-24">
                    <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tighter">
                        Eleva tu <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            Estándar.
                        </span>
                    </h2>
                    <p className="text-slate-300 text-lg lg:text-xl font-medium max-w-lg leading-relaxed">
                        El sistema de gestión más avanzado. Control total sobre tu inventario de alta gama, ventas y auditoría en tiempo real.
                    </p>
                </div>

                {/* FORMULARIO GLASSMORPHISM (LADO DERECHO) */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 p-10 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-black/50">
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="text-3xl font-black text-white italic tracking-tight mb-2">
                                AUTO<span className="text-blue-500">ADMIN</span>
                            </h1>
                            <p className="text-slate-400 font-medium">Panel de Gestión Exclusivo</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="Introduce tu usuario"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-rose-400 text-sm font-bold bg-rose-500/10 px-6 py-4 rounded-2xl border border-rose-500/20 text-center">
                                    Credenciales incorrectas.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/30 flex items-center justify-center mt-8 text-lg"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Autenticando...</span>
                                ) : (
                                    "INICIAR SESIÓN"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
