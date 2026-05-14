'use client';

import { useDashboardStats } from "@/features/admin/hooks/useDashboardStats";
import { AuditTable } from "@/features/admin/components/AuditTable";

export default function AuditPage() {
    const { stats, loading } = useDashboardStats();

    if (loading) return (
        <div className="p-20 text-center space-y-6">
            <div className="w-12 h-12 border-4 border-slate-900 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="font-black text-slate-300 uppercase tracking-[0.5em] text-xs">Accediendo a la Bitácora de Seguridad...</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic">System Audit</h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.5em] mt-4 ml-1">Monitorización global de actividad administrativa</p>
                </div>

                <button
                    onClick={() => window.print()}
                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black italic text-xs uppercase tracking-widest hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-xl flex items-center gap-3"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimir Reporte
                </button>
            </div>

            <AuditTable logs={stats.recentLogs} />

            <div className="pt-10 border-t border-slate-100">
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest text-center">Fin del registro - Sistema Protegido por ConcesionarioApp Audit Engine</p>
            </div>
        </div>
    );
}
