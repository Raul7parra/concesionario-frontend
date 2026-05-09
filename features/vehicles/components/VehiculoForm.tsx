"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { VehicleInput } from "../types";
import {createVehicle} from "@/features/vehicles/hooks/useVehicle";

export function VehicleForm({ onSuccessAction }: { onSuccessAction?: () => void }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<VehicleInput>({
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
            await createVehicle(formData);
            router.refresh();

            if (onSuccessAction) {
                onSuccessAction();
            }
        } catch (error) {
            console.error("Error al crear el vehículo:", error);
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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Tipo */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Tipo de Vehículo</label>
                    <select name="tipo" value={formData.tipo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                        <option value="COCHE">Coche</option>
                        <option value="MOTO">Moto</option>
                    </select>
                </div>

                {/* Marca y Modelo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <input required type="text" name="marca" value={formData.marca} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Modelo</label>
                    <input required type="text" name="modelo" value={formData.modelo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>

                {/* Año y Precio */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Año</label>
                    <input required type="number" name="anio" value={formData.anio} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio (€)</label>
                    <input required type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>

                {/* campos segun el tipo */}
                {formData.tipo === "COCHE" ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número de Puertas</label>
                        <input required type="number" name="numeroPuertas" value={formData.numeroPuertas} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cilindrada (cc)</label>
                        <input required type="number" name="cilindrada" value={formData.cilindrada} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                )}

                {/* Imagen */}
                <div className="col-span-1 md:col-span-2 mt-2">
                    <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
                    <input type="url" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} placeholder="https://ejemplo.com/foto.jpg" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
                    {loading ? "Guardando..." : "Guardar Vehículo"}
                </button>
            </div>
        </form>
    );
}