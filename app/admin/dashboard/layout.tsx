'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-72 bg-slate-900 text-white p-8 flex flex-col shrink-0 shadow-2xl">
                <div className="mb-12 px-2">
                    <h2 className="text-2xl font-black tracking-tighter italic">
                        AUTO<span className="text-blue-500">ADMIN</span>
                    </h2>
                    <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.3em] mt-1">Conectado y Seguro</p>
                </div>

                <nav className="space-y-3 flex-grow">
                    {/* dashboard */}
                    <Link href="/admin/dashboard" className="flex items-center gap-4 hover:bg-blue-600/10 hover:text-blue-400 px-5 py-4 rounded-2xl transition-all duration-300 group font-bold text-sm">
                        <span className="group-hover:scale-125 transition-transform">📊</span> Dashboard
                    </Link>

                    {/* inventario */}
                    <Link href="/admin/dashboard/vehicles" className="flex items-center gap-4 hover:bg-blue-600/10 hover:text-blue-400 px-5 py-4 rounded-2xl transition-all duration-300 group font-bold text-sm">
                        <span className="group-hover:scale-125 transition-transform">🚗</span> Vehículos
                    </Link>

                    {/* ventas */}
                    <Link href="/admin/dashboard/sales" className="flex items-center gap-4 hover:bg-blue-600/10 hover:text-blue-400 px-5 py-4 rounded-2xl transition-all duration-300 group font-bold text-sm">
                        <span className="group-hover:scale-125 transition-transform">📈</span> Ventas
                    </Link>

                    {/* auditoria */}
                    <Link href="/admin/dashboard/audit" className="flex items-center gap-4 hover:bg-blue-600/10 hover:text-blue-400 px-5 py-4 rounded-2xl transition-all duration-300 group font-bold text-sm">
                        <span className="group-hover:scale-125 transition-transform text-lg">🔍</span> Auditoría
                    </Link>
                </nav>

                <div className="border-t border-slate-800 pt-6 mt-auto flex flex-col gap-2">
                    <Link href="/" className="flex items-center gap-4 text-slate-500 hover:text-white hover:bg-slate-800 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest">
                        <span className="text-base">⬅️</span> Salir a la tienda
                    </Link>

                    {/* cerrar sesion */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest text-left"
                    >
                        <span className="text-base">🚪</span> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="flex-grow p-12 overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
}
