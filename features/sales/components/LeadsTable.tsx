'use client';

import { Sale } from "../hooks/useSales";

interface LeadsTableProps {
    sales: Sale[];
    onDelete: (id: string) => void;
}

export function LeadsTable({ sales, onDelete }: LeadsTableProps) {
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
                        <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">Estado</th>
                        <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
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
                                    <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter ${
                                        sale.status === 'ENTREGADO' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        {sale.status}
                                    </span>
                            </td>
                            <td className="p-6">
                                <button
                                    onClick={() => onDelete(sale.id)}
                                    className="text-rose-500 hover:text-rose-700 font-bold text-sm transition-colors opacity-0 group-hover:opacity-100"
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
