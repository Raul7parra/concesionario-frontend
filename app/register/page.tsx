"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Register() {
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            const result = await register(name, email, password);
            if (!result.success) {
                setError(result.error || "Error al crear la cuenta");
            }
        } catch (err) {
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* imagen */}
            <div className="hidden lg:block w-1/2 bg-slate-900 relative">
                <img
                    src="https://images.unsplash.com/photo-1503376713293-270fbb38a164?q=80&w=2070&auto=format&fit=crop"
                    alt="Coche deportivo"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-white max-w-lg">
                        <h2 className="text-5xl font-black mb-6 leading-tight">Da el primer paso hacia tu nuevo vehículo.</h2>
                        <p className="text-xl text-slate-300">Crea una cuenta en segundos y descubre un catálogo de vehículos exclusivos seleccionados para ti.</p>
                    </div>
                </div>
            </div>

            {/* formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <Link href="/" className="text-2xl font-black text-slate-900 inline-block mb-8">
                            Auto<span className="text-blue-600">Premium</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">Crear cuenta nueva</h1>
                        <p className="text-slate-500 mt-2">Introduce tus datos para registrarte</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        {/* NUEVO CAMPO: Nombre y Apellidos */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nombre y Apellidos</label>
                            <input
                                type="text"
                                required
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                placeholder="Ej: Daniel Parra"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                placeholder="tu@correo.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                required
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Repetir Contraseña</label>
                            <input
                                type="password"
                                required
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-2"
                        >
                            {loading ? "Registrando..." : "Crear mi cuenta"}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-600 font-medium">
                        ¿Ya tienes cuenta? <Link href="/login" className="text-blue-600 font-bold hover:underline">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}