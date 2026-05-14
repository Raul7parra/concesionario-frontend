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

    const filteredLogs = logs.filter(log =>
        log.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.tipoEntidad?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
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
                    {filteredLogs.map((log, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-8">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            </td>
                            <td className="px-8 py-8">
                                <span className="font-black text-slate-900 italic text-sm">{log.usuario}</span>
                            </td>
                            <td className="px-8 py-8">
                                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[9px] font-black tracking-widest">
                                    {log.tipoEntidad || 'N/A'}
                                </span>
                            </td>
                            <td className="px-8 py-8">
                                <span className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase ${
                                    log.accion.includes('BORRAR') || log.accion.includes('ELIMINAR') ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                    {log.accion.replace(/_/g, ' ')}
                                </span>
                            </td>
                            <td className="px-8 py-8">
                                <p className="text-[11px] font-bold text-slate-500 max-w-xs truncate">{log.detalles}</p>
                            </td>
                            <td className="px-8 py-8 text-right">
                                <p className="text-sm font-bold text-slate-600">{new Date(log.fecha).toLocaleDateString()}</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase">{new Date(log.fecha).toLocaleTimeString()}</p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
