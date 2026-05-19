'use client';

import { useState } from 'react';

interface Log {
    id: string;
    usuario: string;
    accion: string;
    tipoEntidad: string;
    entidadId: string;
    detalles: string;
    fecha: string;
}

export function AuditTable({ logs }: { logs: Log[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<'ALL' | 'SECURITY' | 'SALES' | 'INVENTORY'>('ALL');

    const filteredLogs = logs.filter(log => {
        const matchesSearch = searchTerm === "" ||
            log.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.tipoEntidad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.detalles?.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (activeTab === 'ALL') return true;
        if (activeTab === 'SECURITY') {
            return log.tipoEntidad === 'SECURITY' || log.accion.includes('LOGIN') || log.accion.includes('REGISTER');
        }
        if (activeTab === 'SALES') {
            return log.tipoEntidad === 'SALE' || log.accion.includes('SALE');
        }
        if (activeTab === 'INVENTORY') {
            return log.tipoEntidad === 'VEHICULO' || log.accion.includes('VEHICULO');
        }
        return true;
    });

    return (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            {/* Cabecera y Buscador */}
            <div className="p-10 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">Forensic Audit Log</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Control total de integridad de datos</p>
                </div>

                <div className="relative w-full lg:w-96">
                    <input
                        type="text"
                        placeholder="Buscar por acción, usuario o tipo..."
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* filtros */}
            <div className="px-10 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-wrap gap-2">
                <button
                    onClick={() => setActiveTab('ALL')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        activeTab === 'ALL'
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                >
                    Todos 📋
                </button>
                <button
                    onClick={() => setActiveTab('SECURITY')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        activeTab === 'SECURITY'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                >
                    Seguridad 🔒
                </button>
                <button
                    onClick={() => setActiveTab('SALES')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        activeTab === 'SALES'
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                >
                    Ventas 💰
                </button>
                <button
                    onClick={() => setActiveTab('INVENTORY')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        activeTab === 'INVENTORY'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                >
                    Inventario 🚗
                </button>
            </div>

            {/* Tabla de Logs */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50">
                    <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rec</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Usuario</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Acción</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detalles</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Timestamp</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {filteredLogs.map((log, i) => {
                        const isFailure = log.accion.includes('FAILURE');
                        const isDelete = log.accion.includes('ELIMINAR') || log.accion.includes('DELETE');
                        const isSuccessSecurity = log.accion === 'LOGIN_SUCCESS' || log.accion === 'REGISTER_ADMIN';

                        return (
                            <tr key={i} className={`hover:bg-slate-50/50 transition-colors group ${
                                isFailure ? 'bg-rose-50/20' : ''
                            }`}>
                                <td className="px-8 py-8">
                                    <div className={`w-2.5 h-2.5 rounded-full ${
                                        isFailure
                                            ? 'bg-rose-500 animate-ping'
                                            : isSuccessSecurity
                                                ? 'bg-emerald-500'
                                                : 'bg-blue-500'
                                    }`} />
                                </td>
                                <td className="px-8 py-8">
                                    <span className={`font-black italic text-sm ${
                                        isFailure ? 'text-rose-700' : 'text-slate-900'
                                    }`}>{log.usuario}</span>
                                </td>
                                <td className="px-8 py-8">
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase ${
                                        log.tipoEntidad === 'SECURITY'
                                            ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                            : log.tipoEntidad === 'SALE'
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                : 'bg-blue-50 text-blue-600 border border-blue-100'
                                    }`}>
                                        {log.tipoEntidad || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-8 py-8">
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase border transition-all ${
                                        isFailure
                                            ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm'
                                            : isSuccessSecurity
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                                                : isDelete
                                                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                                                    : 'bg-blue-50 text-blue-600 border-blue-200'
                                    }`}>
                                        {log.accion.replace(/_/g, ' ')}
                                    </span>
                                </td>
                                <td className="px-8 py-8">
                                    <p className={`text-[11px] font-bold max-w-sm truncate ${
                                        isFailure ? 'text-rose-600 font-extrabold' : 'text-slate-500'
                                    }`}>{log.detalles}</p>
                                </td>
                                <td className="px-8 py-8 text-right">
                                    <p className="text-sm font-bold text-slate-600">{new Date(log.fecha).toLocaleDateString()}</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase">{new Date(log.fecha).toLocaleTimeString()}</p>
                                </td>
                            </tr>
                        );
                    })}
                    {filteredLogs.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-8 py-16 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                No se han encontrado registros en esta categoría
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
