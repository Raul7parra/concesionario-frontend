"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";

export function Header() {
    const { isAuthenticated, logout } = useAuth();
    const { favorites, toggleFavorite } = useFavorites();
    const [showPreview, setShowPreview] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowPreview(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">
                <Link href="/" className="text-2xl font-black tracking-tighter">
                    🚗 Auto<span className="text-blue-500">Premium</span>
                </Link>

                <nav className="flex items-center space-x-6 font-medium text-sm">
                    <Link href="/" className="hover:text-blue-400 transition-colors">
                        Catálogo
                    </Link>

                    <Link href="/coches" className="hover:text-blue-400 transition-colors">
                        Coches
                    </Link>

                    <Link href="/motos" className="hover:text-blue-400 transition-colors">
                        Motos
                    </Link>

                    <Link href="/sobre-nosotros" className="hover:text-blue-400 transition-colors">
                        Sobre Nosotros
                    </Link>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="relative flex items-center gap-1.5 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5 active:scale-95"
                            title="Mis Favoritos"
                        >
                            <svg className={`w-5 h-5 transition-all duration-300 ${favorites.length > 0 ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-400'}`} viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            {favorites.length > 0 && (
                                <span className="absolute -top-1.5 -right-1 bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-full animate-bounce">
                                    {favorites.length}
                                </span>
                            )}
                        </button>

                        {showPreview && (
                            <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl border border-slate-100 shadow-2xl z-50 text-slate-800 p-6 animate-in slide-in-from-top-3 duration-300">
                                <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                                    <span>Favoritos ({favorites.length})</span>
                                    {favorites.length > 0 && <span className="text-[10px] text-blue-600 lowercase font-bold tracking-tight">AutoPremium Club</span>}
                                </h4>

                                {favorites.length === 0 ? (
                                    <div className="text-center py-6">
                                        <p className="text-2xl mb-2">💔</p>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tu garaje está vacío</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                        {favorites.map((v) => (
                                            <div key={v.id} className="flex gap-4 items-center group relative pb-3 border-b border-slate-50 last:border-b-0">
                                                <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                                    <img src={v.imagenUrl} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="flex-grow">
                                                    <Link
                                                        href={`/vehicle/${v.id}`}
                                                        onClick={() => setShowPreview(false)}
                                                        className="font-bold text-xs text-slate-900 hover:text-blue-600 transition-colors block leading-tight truncate max-w-[140px]"
                                                    >
                                                        {v.marca} {v.modelo}
                                                    </Link>
                                                    <p className="text-[10px] font-black text-slate-400 mt-1">{v.precio.toLocaleString()} €</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleFavorite(v)}
                                                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Quitar"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
                            <div className="flex items-center gap-3 bg-gray-800 py-1.5 px-1.5 pr-4 rounded-full border border-gray-700 shadow-sm">
                                <div className="bg-blue-600 text-white p-1.5 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-gray-200 truncate max-w-[150px]">
                                    Administrador
                                </span>
                            </div>

                            <button
                                onClick={logout}
                                title="Cerrar sesión"
                                className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="border-l border-gray-700 pl-6">
                            <Link
                                href="/login"
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors text-xs font-bold shadow-md shadow-blue-500/20"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
