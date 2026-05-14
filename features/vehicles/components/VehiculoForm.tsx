"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { VehicleInput } from "../types";
import { createVehicle, updateVehicle } from "@/features/vehicles/hooks/useVehicle";
import { z } from "zod";
import { toast } from "sonner";

const vehicleSchema = z.object({
    marca: z.string().min(2, "La marca debe tener al menos 2 caracteres"),
    modelo: z.string().min(2, "El modelo debe tener al menos 2 caracteres"),
    anio: z.number().min(1900, "Año muy antiguo").max(new Date().getFullYear() + 1, "Año inválido"),
    precio: z.number().positive("El precio debe ser mayor a 0 €"),
    estado: z.enum(["NUEVO", "OCASION"]),
    tipo: z.enum(["COCHE", "MOTO"]),
    imagenUrl: z.union([z.string().url("Debe ser una URL válida empezando por http:// o https://"), z.literal("")]),
    numeroPuertas: z.number().min(2, "Mínimo 2 puertas").max(7, "Máximo 7 puertas").optional(),
    cilindrada: z.number().positive("La cilindrada debe ser mayor a 0").optional()
});

interface VehicleFormProps {
    onSuccessAction?: () => void;
    initialData?: VehicleInput;
    vehicleId?: string;
}

export function VehicleForm({ onSuccessAction, initialData, vehicleId }: VehicleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

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
        setErrors({});

        const validation = vehicleSchema.safeParse(formData);

        if (!validation.success) {
            const formattedErrors: Record<string, string> = {};
            validation.error.issues.forEach(issue => {
                if (issue.path[0]) formattedErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(formattedErrors);
            setLoading(false);
            return;
        }

        try {
            if (vehicleId) {
                await updateVehicle(vehicleId, formData);
                toast.success("Vehículo actualizado correctamente"); // <-- Aviso de éxito
            } else {
                await createVehicle(formData);
                toast.success("Nuevo vehículo registrado con éxito"); // <-- Aviso de éxito
            }
            router.refresh();
            if (onSuccessAction) onSuccessAction();

        } catch (error) {
            console.error("Error al guardar el vehículo:", error);
            toast.error("Error de conexión con el servidor"); // <-- Aviso de error
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ["precio", "anio", "numeroPuertas", "cilindrada"].includes(name)
                ? Number(value)
                : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow">

                {/* Tipo y Estado */}
                <div className="grid grid-cols-2 gap-5 col-span-1 md:col-span-2">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Tipo</label>
                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            disabled={!!vehicleId}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold disabled:opacity-50"
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
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
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
                           className={`w-full bg-slate-50 border ${errors.marca ? 'border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'} text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 transition-all font-medium`} />
                    {errors.marca && <p className="text-rose-500 text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.marca}</p>}
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Modelo</label>
                    <input required type="text" name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Ej. Corolla"
                           className={`w-full bg-slate-50 border ${errors.modelo ? 'border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'} text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 transition-all font-medium`} />
                    {errors.modelo && <p className="text-rose-500 text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.modelo}</p>}
                </div>

                {/* Año y Precio */}
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Año</label>
                    <input required type="number" name="anio" value={formData.anio} onChange={handleChange}
                           className={`w-full bg-slate-50 border ${errors.anio ? 'border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'} text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 transition-all font-medium`} />
                    {errors.anio && <p className="text-rose-500 text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.anio}</p>}
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Precio (€)</label>
                    <div className="relative">
                        <input required type="number" step="0.01" name="precio" value={formData.precio || ''} onChange={handleChange}
                               className={`w-full bg-slate-50 border ${errors.precio ? 'border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'} text-slate-900 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-4 transition-all font-black text-lg`} />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
                    </div>
                    {errors.precio && <p className="text-rose-500 text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.precio}</p>}
                </div>

                {/* Campos específicos */}
                <div>
                    {formData.tipo === "COCHE" ? (
                        <>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Puertas</label>
                            <input required type="number" name="numeroPuertas" value={formData.numeroPuertas || ''} onChange={handleChange}
                                   className={`w-full bg-slate-50 border ${errors.numeroPuertas ? 'border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'} text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 transition-all font-medium`} />
                            {errors.numeroPuertas && <p className="text-rose-500 text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.numeroPuertas}</p>}
                        </>
                    ) : (
                        <>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Cilindrada (CC)</label>
                            <input required type="number" name="cilindrada" value={formData.cilindrada || ''} onChange={handleChange}
                                   className={`w-full bg-slate-50 border ${errors.cilindrada ? 'border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'} text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 transition-all font-medium`} />
                            {errors.cilindrada && <p className="text-rose-500 text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.cilindrada}</p>}
                        </>
                    )}
                </div>

                {/* Imagen */}
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">URL Imagen</label>
                    <input type="url" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} placeholder="https://..."
                           className={`w-full bg-slate-50 border ${errors.imagenUrl ? 'border-rose-500 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'} text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 transition-all font-medium`} />
                    {errors.imagenUrl && <p className="text-rose-500 text-[10px] uppercase font-bold mt-1 tracking-wider">{errors.imagenUrl}</p>}
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
