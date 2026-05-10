"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/features/vehicles/types";
import {deleteVehicle} from "@/features/vehicles/hooks/useVehicle";
import {VehicleForm} from "@/features/vehicles/components/VehiculoForm";

export function VehicleTable({ initialVehicles }: { initialVehicles: Vehicle[] }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null); // Nuevo estado

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`¿Estás seguro de que quieres eliminar el ${name}?`)) return;
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

    return (
        <>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">Vehículo</th>
                        <th className="px-6 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">Tipo</th>
                        <th className="px-6 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">Precio</th>
                        <th className="px-6 py-5 text-xs font-black uppercase text-slate-400 tracking-widest text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {initialVehicles.map((v) => (
                        <tr key={v.id} className={`hover:bg-slate-50/50 transition-colors ${isDeleting === v.id ? 'opacity-40' : ''}`}>
                            {/* ... (Celdas de imagen, nombre, tipo y precio se quedan igual) ... */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                        {v.imagenUrl ? <img src={v.imagenUrl} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-xl">🚗</div>}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{v.marca} {v.modelo}</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{v.anio}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">{v.tipo || "Desconocido"}</span>
                            </td>
                            <td className="px-6 py-4 text-sm font-black text-slate-900">{v.precio.toLocaleString()} €</td>

                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-1">
                                    {/* Botón de Editar actualizado */}
                                    <button
                                        onClick={() => setEditingVehicle(v)}
                                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        title="Editar"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </button>
                                    {/* Botón de Borrar (Igual que antes) */}
                                    <button
                                        onClick={() => handleDelete(v.id, `${v.marca} ${v.modelo}`)}
                                        disabled={isDeleting === v.id}
                                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        title="Eliminar"
                                    >
                                        {isDeleting === v.id ? "⏳" : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Edición que se muestra flotando si editingVehicle no es null */}
            {editingVehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setEditingVehicle(null)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="p-8">
                            <h2 className="text-2xl font-black mb-6 text-slate-900">Editar Vehículo</h2>
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
                                    cilindrada: editingVehicle.cilindrada
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