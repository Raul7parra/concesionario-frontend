"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { VehicleInput } from "../types";
import {createVehicle, updateVehicle} from "@/features/vehicles/hooks/useVehicle";

interface VehicleFormProps {
    onSuccessAction?: () => void;
    initialData?: VehicleInput;
    vehicleId?: string;
}

export function VehicleForm({ onSuccessAction, initialData, vehicleId }: VehicleFormProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<VehicleInput>(initialData || {
        marca: "",
        modelo: "",
        anio: new Date().getFullYear(),
        precio: 0,
        estado: "NUEVO",
        tipo: "COCHE",
        imagenUrl: "",
        numeroPuertas: 5,
        cilindrada: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (vehicleId) {
                await updateVehicle(vehicleId, formData);
            } else {
                await createVehicle(formData);
            }

            router.refresh();

            if (onSuccessAction) {
                onSuccessAction();
            }
        } catch (error) {
            console.error("Error al guardar el vehículo:", error);
            alert("Hubo un error al guardar");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "precio" || name === "anio" || name === "numeroPuertas" || name === "cilindrada"
                ? Number(value)
                : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow">

                {/* Tipo y Estado (En la misma fila para ahorrar espacio vertical) */}
                <div className="grid grid-cols-2 gap-5 col-span-1 md:col-span-2">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Tipo</label>
                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            disabled={!!vehicleId}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="COCHE">🚗 Coche</option>
                            <option value="MOTO">🏍️ Moto</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Estado</label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold appearance-none"
                        >
                            <option value="NUEVO">✨ Nuevo</option>
                            <option value="OCASION">🔄 Ocasión</option>
                        </select>
                    </div>
                </div>

                {/* Marca y Modelo */}
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Marca</label>
                    <input required type="text" name="marca" value={formData.marca} onChange={handleChange} placeholder="Ej. Toyota"
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-300" />
                </div>
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Modelo</label>
                    <input required type="text" name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Ej. Corolla"
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-300" />
                </div>

                {/* Año y Precio */}
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Año</label>
                    <input required type="number" name="anio" value={formData.anio} onChange={handleChange}
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium" />
                </div>
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Precio (€)</label>
                    <div className="relative">
                        <input required type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange}
                               className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-black text-lg" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
                    </div>
                </div>

                {/* Campos específicos e Imagen */}
                <div>
                    {formData.tipo === "COCHE" ? (
                        <>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Puertas</label>
                            <input required type="number" name="numeroPuertas" value={formData.numeroPuertas || ''} onChange={handleChange}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium" />
                        </>
                    ) : (
                        <>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Cilindrada (CC)</label>
                            <input required type="number" name="cilindrada" value={formData.cilindrada || ''} onChange={handleChange}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium" />
                        </>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">URL Imagen</label>
                    <input type="url" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} placeholder="https://..."
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-300" />
                </div>
            </div>

            {/* Botón de Acción */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                >
                    {loading ? "Guardando..." : vehicleId ? "Actualizar Vehículo" : "Guardar Vehículo"}
                </button>
            </div>
        </form>
    );
}