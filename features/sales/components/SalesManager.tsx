'use client';

import { useState, useEffect } from 'react';

interface Sale {
    id: string;
    client: string;
    vehicleModel: string;
    finalPrice: number;
    status: string;
    date: string;
    email: string;
    telefono: string;
}

const GRAPHQL_URL = "http://127.0.0.1:8080/graphql";

function getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
}

export function SalesManager() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchSales = async () => {
        setIsLoading(true);
        try {
            const query = `
                query {
                    listSales {
                        id client vehicleModel finalPrice status date email telefono
                    }
                }
            `;
            const res = await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ query })
            });
            const json = await res.json();
            if (json.data?.listSales) {
                const sorted = json.data.listSales.sort((a: Sale, b: Sale) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setSales(sorted);
            }
        } catch (error) {
            console.error("Error cargando ventas:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        Promise.resolve().then(() => fetchSales());
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        try {
            const query = `
                mutation($id: ID!, $status: String!) {
                    updateSaleStatus(id: $id, status: $status) {
                        id status
                    }
                }
            `;
            await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ query, variables: { id, status: newStatus } })
            });
            fetchSales(); // Recargar la tabla automáticamente
        } catch (error) {
            console.error("Error actualizando estado:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteSale = async (id: string) => {
        if (!confirm("⚠️ ¿Estás seguro de eliminar este registro permanentemente?")) return;
        setUpdatingId(id);
        try {
            const query = `
                mutation($id: ID!) {
                    deleteSale(id: $id)
                }
            `;
            await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ query, variables: { id } })
            });
            fetchSales();
        } catch (error) {
            console.error("Error eliminando venta:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
            case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
            case 'FINANCED': return 'bg-blue-50 text-blue-600 border-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
            case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    return (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">CRM Ventas</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Gestión de Reservas y Financiación</p>
                </div>
                <button
                    onClick={fetchSales}
                    className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-900 text-white shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                    Actualizar Datos 🔄
                </button>
            </div>

            <div className="overflow-x-auto relative min-h-[400px]">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50">
                    <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente / Contacto</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehículo Solicitado</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Importe</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Gestión de Estado</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6">
                                <p className="font-black italic text-sm text-slate-900">{sale.client}</p>
                                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{sale.email || 'Sin Email'} • {sale.telefono || 'Sin Teléfono'}</p>
                            </td>
                            <td className="px-8 py-6">
                                <p className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg inline-block">{sale.vehicleModel}</p>
                            </td>
                            <td className="px-8 py-6">
                                <p className="font-black text-slate-900">{formatCurrency(sale.finalPrice)}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{new Date(sale.date).toLocaleDateString()}</p>
                            </td>
                            <td className="px-8 py-6 text-center relative">
                                {/* Selector de Estado Interactivo */}
                                <select
                                    value={sale.status}
                                    onChange={(e) => updateStatus(sale.id, e.target.value)}
                                    disabled={updatingId === sale.id}
                                    className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border cursor-pointer outline-none transition-all text-center appearance-none ${getStatusStyle(sale.status)} ${updatingId === sale.id ? 'opacity-50 cursor-wait' : 'hover:scale-105'}`}
                                    style={{textAlignLast: 'center'}}
                                >
                                    <option value="PENDING" className="text-slate-900 bg-white">🟠 PENDIENTE</option>
                                    <option value="FINANCED" className="text-slate-900 bg-white">🔵 FINANCIADO</option>
                                    <option value="COMPLETED" className="text-slate-900 bg-white">🟢 COMPLETADO</option>
                                    <option value="REJECTED" className="text-slate-900 bg-white">🔴 RECHAZADO</option>
                                </select>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <button
                                    onClick={() => deleteSale(sale.id)}
                                    disabled={updatingId === sale.id}
                                    className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors ml-auto shadow-sm"
                                    title="Eliminar Registro"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {sales.length === 0 && !isLoading && (
                        <tr>
                            <td colSpan={5} className="px-8 py-16 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                                    <span className="text-2xl">📭</span>
                                </div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No hay reservas en el sistema</p>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
