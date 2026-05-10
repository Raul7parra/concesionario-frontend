"use client";

import { useState } from "react";
import {VehicleForm} from "@/features/vehicles/components/VehiculoForm";

export function AddVehicleModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold tracking-wide hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Añadir Vehículo
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="p-8">
                            <h2 className="text-2xl font-black mb-6 text-slate-900">Registrar Nuevo Vehículo</h2>
                            <VehicleForm onSuccessAction={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}