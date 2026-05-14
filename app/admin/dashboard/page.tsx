'use client';

import { useDashboardStats } from "@/features/admin/hooks/useDashboardStats";
import { StatsCard } from "@/features/admin/components/StatsCard";
import { ActivityChart } from "@/features/admin/components/ActivityChart";

export default function AdminDashboard() {
    const { stats, loading } = useDashboardStats();

    if (loading) return (
        <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Sincronizando Centro de Mando...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-1000 pb-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Global Overview</h1>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.4em] mt-2 ml-1">Análisis de rendimiento real</p>
                </div>
            </header>

            {/* Fila superior de métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard label="Stock Total" value={stats.totalVehicles} subValue="Vehículos" color="blue" icon={<span>🚗</span>} />
                <StatsCard label="Ventas Mes" value={stats.totalSales} subValue="Unidades" color="indigo" icon={<span>📈</span>} />
                <StatsCard label="Ingresos" value={`${(stats.salesRevenue / 1000).toFixed(1)}k`} subValue="EUR" color="emerald" icon={<span>💰</span>} />
                <StatsCard label="Seguridad" value="Protegido" subValue="SSL/JWT" color="rose" icon={<span>🛡️</span>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Widget de Capital Assets */}
                <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div>
                        <h4 className="text-blue-400 font-black uppercase text-[8px] tracking-[0.4em] mb-6">Asset Valuation</h4>
                        <p className="text-slate-400 text-[9px] font-bold uppercase mb-1">Capital en Parking</p>
                        <h2 className="text-3xl font-black text-white italic tracking-tighter">
                            {stats.inventoryValue >= 1000000
                                ? `${(stats.inventoryValue / 1000000).toFixed(2)}M`
                                : `${(stats.inventoryValue / 1000).toFixed(1)}k`}
                            <span className="text-blue-500 text-xs ml-1 font-bold">EUR</span>
                        </h2>
                    </div>
                    <div className="pt-6 border-t border-slate-800">
                        <p className="text-slate-400 text-[9px] font-bold uppercase mb-3 text-right">Rotación de Stock</p>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000"
                                 style={{ width: `${Math.min((stats.totalSales / (stats.totalVehicles || 1)) * 100, 100)}%` }} />
                        </div>
                    </div>
                </div>

                {/* Sección del Gráfico */}
                <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
                    <h3 className="text-slate-900 text-lg font-black italic mb-6 uppercase tracking-tighter">Activity Analytics</h3>
                    <ActivityChart />
                </div>
            </div>

            {/* Logs de Actividad Reciente */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-slate-900 text-lg font-black italic uppercase tracking-tighter">Live Activity Log</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-600 text-[8px] font-black uppercase tracking-widest">Servidor Activo</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.recentLogs.slice(0, 3).map((log, i) => (
                        <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-50 hover:border-blue-100 transition-colors group">
                            <p className="text-[9px] font-black text-blue-500 uppercase mb-2 tracking-widest">{log.accion}</p>
                            <p className="text-xs font-bold text-slate-800 italic mb-2 line-clamp-1">{`"${log.detalles || 'Sin detalles'}"`}</p>                            <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-2">
                                <span className="text-[8px] text-slate-400 font-black uppercase">Admin {log.usuario}</span>
                                <span className="text-[8px] text-slate-300 font-bold">{new Date(log.fecha).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
