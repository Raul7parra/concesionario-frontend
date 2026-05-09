"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/features/vehicles/types";
import {deleteVehicle} from "@/features/vehicles/hooks/useVehicle";

interface CardProps {
    vehicle: Vehicle;
    isAdmin?: boolean;
}

export function Card({ vehicle, isAdmin = false }: CardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`¿Eliminar ${vehicle.marca} ${vehicle.modelo}?`)) return;
        setIsDeleting(true);
        try {
            const success = await deleteVehicle(vehicle.id);
            if (success) router.refresh();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full ${isDeleting ? 'opacity-50 scale-95' : ''}`}>

            {/* imagen */}
            <div className="relative h-60 w-full overflow-hidden bg-gray-50">
                {vehicle.imagenUrl ? (
                    <img
                        src={vehicle.imagenUrl}
                        alt={vehicle.modelo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-300">
                        <span className="text-5xl mb-2">🚗</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sin imagen</span>
                    </div>
                )}

                {/* estados */}
                <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
                        vehicle.estado === 'NUEVO'
                            ? 'bg-emerald-500/90 text-white'
                            : 'bg-amber-500/90 text-white'
                    }`}>
                        {vehicle.estado}
                    </span>
                </div>
            </div>

            {/* informacion */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{vehicle.marca}</p>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{vehicle.modelo}</h3>
                </div>

                <div className="flex items-center gap-3 text-gray-400 text-xs font-medium mb-6">
                    <span className="flex items-center gap-1">🗓️ {vehicle.anio}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="capitalize">
                        {vehicle.tipo ? vehicle.tipo.toLowerCase() : "Vehículo"}
                    </span>
                </div>

                <div className="mt-auto space-y-5">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest mb-1">Precio Final</p>
                            <p className="text-3xl font-black text-gray-900 tracking-tighter">
                                {vehicle.precio.toLocaleString()} <span className="text-lg font-bold">€</span>
                            </p>
                        </div>

                        {isAdmin && (
                            <button
                                onClick={handleDelete}
                                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* estilo */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 border border-gray-100 rounded-xl py-2.5 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            {vehicle.tipo === "COCHE"
                                ? `🚪 ${vehicle.numeroPuertas || 0} Puertas`
                                : `⚡ ${vehicle.cilindrada || 0} CC`}
                        </div>
                        <button className="bg-slate-900 text-white rounded-xl py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-md">
                            Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}