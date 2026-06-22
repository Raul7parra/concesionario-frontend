'use client';

import { useState, useEffect, useRef } from 'react';
import { AuditCharts } from './audit/AuditCharts';
import { AuditPayloadModal } from './audit/AuditPayloadModal';
import { AuditPagination } from './audit/AuditPagination';
import {Log} from "@/features/admin/components/audit/type";

const GRAPHQL_URL = "http://127.0.0.1:8080/graphql";

function getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
}

export function AuditTable() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<'ALL' | 'SECURITY' | 'SALES' | 'INVENTORY'>('ALL');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);
    const [isLive, setIsLive] = useState(false);
    const liveIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [selectedPayload, setSelectedPayload] = useState<string | null>(null);

    const fetchLogs = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const query = `
                query($page: Int, $size: Int, $tipo: String, $search: String) {
                    listarLogs(page: $page, size: $size, tipo: $tipo, search: $search) {
                        id usuario accion tipoEntidad entidadId detalles fecha ipAddress userAgent
                    }
                }
            `;
            const res = await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ query, variables: { page, size, tipo: activeTab, search: searchTerm } })
            });
            const json = await res.json();
            if (json.data?.listarLogs) setLogs(json.data.listarLogs);
        } catch (error) {
            console.error("Error cargando logs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => fetchLogs(false), 300);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, activeTab, page, size]);

    useEffect(() => {
        if (isLive) {
            liveIntervalRef.current = setInterval(() => fetchLogs(true), 5000);
        } else {
            if (liveIntervalRef.current) clearInterval(liveIntervalRef.current);
        }
        return () => { if (liveIntervalRef.current) clearInterval(liveIntervalRef.current); };
    }, [isLive, searchTerm, activeTab, page, size]);

    return (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative">

            {selectedPayload !== null && (
                <AuditPayloadModal payload={selectedPayload} onClose={() => setSelectedPayload(null)} />
            )}

            <div className="p-10 border-b border-slate-50 bg-slate-50/30">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Forensic SOC</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Security Operations Center - Live Telemetry</p>
                    </div>
                    <button
                        onClick={() => setIsLive(!isLive)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border shadow-sm ${isLive ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-300'}`}></span>
                        {isLive ? 'Live Tracking On' : 'Live Tracking Off'}
                    </button>
                </div>

                <AuditCharts logs={logs} />
            </div>

            <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white">
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => { setActiveTab('ALL'); setPage(0); }} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'ALL' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Todos 📋</button>
                    <button onClick={() => { setActiveTab('SECURITY'); setPage(0); }} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'SECURITY' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Seguridad 🔒</button>
                    <button onClick={() => { setActiveTab('SALES'); setPage(0); }} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'SALES' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Ventas 💰</button>
                    <button onClick={() => { setActiveTab('INVENTORY'); setPage(0); }} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'INVENTORY' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Inventario 🚗</button>
                </div>
                <div className="relative w-full lg:w-72">
                    <input type="text" placeholder="Buscar Trace ID, IP, Usuario..." className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }} />
                    <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="overflow-x-auto relative min-h-[400px]">
                {isLoading && !isLive && <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div></div>}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50">
                    <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rec</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actor</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Origen</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Payload Analizado</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Timestamp</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {logs.map((log, i) => {
                        const isFailure = log.accion.includes('FAILURE');
                        let deviceStr = "Desconocido";
                        if (log.userAgent) {
                            if (log.userAgent.includes("Windows")) deviceStr = "Windows PC";
                            else if (log.userAgent.includes("Mac OS")) deviceStr = "Mac OS";
                            else if (log.userAgent.includes("Android")) deviceStr = "Android Device";
                            else if (log.userAgent.includes("iPhone")) deviceStr = "iPhone";
                            else deviceStr = log.userAgent.split(' ')[0] || "Browser";
                        }

                        return (
                            <tr key={log.id || i} className={`hover:bg-slate-50/50 transition-colors group ${isFailure ? 'bg-rose-50/20' : ''}`}>
                                <td className="px-8 py-6"><div className={`w-2.5 h-2.5 rounded-full ${isFailure ? 'bg-rose-500 animate-ping' : 'bg-slate-900'}`} /></td>
                                <td className="px-8 py-6">
                                    <p className={`font-black italic text-sm ${isFailure ? 'text-rose-700' : 'text-slate-900'}`}>{log.usuario}</p>
                                    <span className={`inline-block mt-1 px-3 py-1 rounded-lg text-[8px] font-black tracking-widest uppercase ${log.tipoEntidad === 'SECURITY' ? 'bg-indigo-50 text-indigo-600' : log.tipoEntidad === 'SALE' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{log.accion.replace(/_/g, ' ')}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="font-mono text-xs font-bold text-slate-700">{log.ipAddress || '127.0.0.1'}</p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{deviceStr}</p>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <button
                                        onClick={() => setSelectedPayload(log.detalles)}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                                    >
                                        Ver Payload 🔍
                                    </button>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <p className="text-sm font-bold text-slate-600">{new Date(log.fecha).toLocaleDateString()}</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase">{new Date(log.fecha).toLocaleTimeString()}</p>
                                </td>
                            </tr>
                        );
                    })}
                    {logs.length === 0 && !isLoading && (
                        <tr><td colSpan={5} className="px-8 py-16 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No hay datos en esta página</td></tr>
                    )}
                    </tbody>
                </table>
            </div>

            <AuditPagination page={page} size={size} logsLength={logs.length} setPage={setPage} setSize={setSize} />

        </div>
    );
}
