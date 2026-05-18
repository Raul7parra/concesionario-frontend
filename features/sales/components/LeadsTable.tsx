'use client';

import { Sale } from "../hooks/useSales";

interface LeadsTableProps {
    sales: Sale[];
    onDelete: (id: string) => void;
    onUpdateStatus: (id: string, status: string) => void;
}

export function LeadsTable({ sales, onDelete, onUpdateStatus }: LeadsTableProps) {
    return (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900 italic">Historial de Ventas</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-50/50">
                        <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">Cliente</th>
                        <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">Vehículo</th>
                        <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">Precio</th>
                        <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">Estado / Cambiar</th>
                        <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Opciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-slate-50/50 transition-all duration-300 group">
                            <td className="p-6">
                                <div className="font-bold text-slate-900">{sale.client}</div>
                                <div className="text-xs text-slate-400">ID: #{sale.id.substring(0, 8)}</div>
                            </td>
                            <td className="p-6 font-medium text-slate-600">{sale.vehicleModel}</td>
                            <td className="p-6">
                                <span className="font-black text-slate-900">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(sale.finalPrice)}
                                </span>
                            </td>
                            <td className="p-6">
                                {/* Selector de estado tipo Badge premium */}
                                <div className="relative inline-block">
                                    <select
                                        value={sale.status}
                                        onChange={(e) => onUpdateStatus(sale.id, e.target.value)}
                                        className={`pl-4 pr-10 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border cursor-pointer transition-all outline-none appearance-none ${
                                            sale.status === 'ENTREGADO' || sale.status === 'COMPLETADO'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/80'
                                                : sale.status === 'CANCELADO'
                                                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100/80'
                                                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/80'
                                        }`}
                                    >
                                        <option value="RESERVADO" className="bg-white text-slate-900 font-bold">RESERVADO</option>
                                        <option value="COMPLETADO" className="bg-white text-slate-900 font-bold">COMPLETADO</option>
                                        <option value="ENTREGADO" className="bg-white text-slate-900 font-bold">ENTREGADO</option>
                                        <option value="CANCELADO" className="bg-white text-slate-900 font-bold">CANCELADO</option>
                                    </select>
                                    {/* Flechita estilizada a la derecha del select */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                            <td className="p-6 text-right">
                                <button
                                    onClick={() => onDelete(sale.id)}
                                    className="text-rose-500 hover:text-rose-700 font-black text-[10px] uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
