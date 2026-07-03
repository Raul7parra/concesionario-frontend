'use client';

import { SalesManager } from "@/features/sales/components/SalesManager";

export default function SalesPage() {
    return (
        <div className="p-4 sm:p-10 space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Panel de Ventas</h1>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Administración de Leads y Transacciones
                </p>
            </div>

            <SalesManager />

        </div>
    );
}
