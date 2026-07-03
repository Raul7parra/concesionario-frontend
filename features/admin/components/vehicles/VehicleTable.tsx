"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/features/vehicles/types";
import { deleteVehicle } from "@/features/vehicles/hooks/useVehicle";
import { VehicleForm } from "@/features/vehicles/components/VehiculoForm";

export function VehicleTable({ initialVehicles }: { initialVehicles: Vehicle[] }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("TODOS");
    const [filterCondition, setFilterCondition] = useState("TODOS");

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`⚠️ ¿Estás seguro de que quieres eliminar el ${name} de forma permanente?`)) return;
        setIsDeleting(id);
        try {
            const success = await deleteVehicle(id);
            if (success) router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(null);
        }
    };

    // Lógica de filtrado ultrarrápida en el cliente
    const filteredVehicles = useMemo(() => {
        return initialVehicles.filter(v => {
            const matchesSearch = `${v.marca} ${v.modelo}`.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === "TODOS" || v.tipo?.toUpperCase() === filterType;
            const matchesCondition = filterCondition === "TODOS" || v.estado?.toUpperCase() === filterCondition;
            return matchesSearch && matchesType && matchesCondition;
        });
    }, [initialVehicles, searchTerm, filterType, filterCondition]);

    return (
        <>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                {/* BARRA DE FILTROS Y BÚSQUEDA */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Buscar por marca o modelo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-bold shadow-sm"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-black uppercase tracking-widest text-slate-600 cursor-pointer shadow-sm"
                        >
                            <option value="TODOS">Todos los Tipos</option>
                            <option value="COCHE">🚗 Coches</option>
                            <option value="MOTO">🏍️ Motos</option>
                        </select>
                        <select
                            value={filterCondition}
                            onChange={(e) => setFilterCondition(e.target.value)}
                            className="px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-xs font-black uppercase tracking-widest text-slate-600 cursor-pointer shadow-sm"
                        >
                            <option value="TODOS">Cualquier Estado</option>
                            <option value="NUEVO">✨ Nuevos</option>
                            <option value="OCASION">🔄 Ocasión</option>
                        </select>
                    </div>
                </div>

                {/* TABLA DE RESULTADOS */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Vehículo</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Atributos</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Precio Oficial</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {filteredVehicles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-20 text-center text-slate-400">
                                    <div className="text-4xl mb-4">🏜️</div>
                                    <p className="text-xs font-black uppercase tracking-widest">No hay vehículos que coincidan con la búsqueda</p>
                                </td>
                            </tr>
                        ) : (
                            filteredVehicles.map((v) => (
                                <tr key={v.id} className={`hover:bg-slate-50/80 transition-colors group ${isDeleting === v.id ? 'opacity-40 animate-pulse' : ''}`}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
                                                {v.imagenUrl ? <img src={v.imagenUrl} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-2xl bg-white">{v.tipo === 'MOTO' ? '🏍️' : '🚗'}</div>}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-base">{v.marca} {v.modelo}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Año {v.anio}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 space-y-2">
                                        <span className={`inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg mr-2 ${v.tipo === 'MOTO' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{v.tipo || "Desconocido"}</span>
                                        <span className={`inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${v.estado === 'NUEVO' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>{v.estado}</span>
                                    </td>
                                    <td className="px-6 py-5 text-base font-black text-slate-900">
                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(v.precio)}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setEditingVehicle(v)} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Editar Vehículo">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(v.id, `${v.marca} ${v.modelo}`)} disabled={isDeleting === v.id} className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Dar de baja">
                                                {isDeleting === v.id ? "⏳" : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL DE EDICIÓN */}
            {editingVehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
                    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-slate-100">
                        <button onClick={() => setEditingVehicle(null)} className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="p-10">
                            <h2 className="text-3xl font-black mb-2 text-slate-900 italic tracking-tight">Editar Vehículo</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Modificando ficha técnica</p>
                            <VehicleForm
                                vehicleId={editingVehicle.id}
                                initialData={{
                                    marca: editingVehicle.marca,
                                    modelo: editingVehicle.modelo,
                                    anio: editingVehicle.anio,
                                    precio: editingVehicle.precio,
                                    estado: editingVehicle.estado?.toUpperCase() as "NUEVO" | "OCASION",
                                    tipo: editingVehicle.tipo?.toUpperCase() as "COCHE" | "MOTO",
                                    imagenUrl: editingVehicle.imagenUrl || "",
                                    numeroPuertas: editingVehicle.numeroPuertas,
                                    cilindrada: editingVehicle.cilindrada,
                                    combustible: editingVehicle.combustible,
                                    transmision: editingVehicle.transmision
                                }}
                                onSuccessAction={() => setEditingVehicle(null)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
