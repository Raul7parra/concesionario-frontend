// Importamos el componente Link
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col shrink-0">
                <div className="mb-10 px-2">
                    <h2 className="text-xl font-black tracking-tighter">AUTO<span className="text-blue-400">ADMIN</span></h2>
                </div>

                <nav className="space-y-2 flex-grow">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-xl font-bold">
                        📊 Dashboard
                    </Link>
                    <Link href="/admin/dashboard" className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl transition-all">
                        🚗 Vehículos
                    </Link>
                    <Link href="#" className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl transition-all">
                        📈 Ventas
                    </Link>
                </nav>

                <div className="border-t border-slate-800 pt-6">
                    <Link href="/" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 rounded-xl transition-all">
                        ⬅️ Salir a la tienda
                    </Link>
                </div>
            </aside>

            <main className="flex-grow p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}