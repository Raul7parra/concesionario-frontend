"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-black tracking-tighter">
                    🚗 Auto<span className="text-blue-500">Premium</span>
                </Link>

                <nav className="flex items-center space-x-6 font-medium">
                    <Link href="/" className="hover:text-blue-400 transition-colors">
                        Catálogo
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
                            <div className="flex items-center gap-3 bg-gray-800 py-1.5 px-1.5 pr-4 rounded-full border border-gray-700 shadow-sm">
                                <div className="bg-blue-600 text-white p-1.5 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-200 truncate max-w-[150px]">
                                    {user.name || user.email.split('@')[0]}
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
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm font-bold shadow-md shadow-blue-500/20"
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