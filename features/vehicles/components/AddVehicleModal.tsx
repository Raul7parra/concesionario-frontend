"use client";

import { useState } from "react";
import {VehicleForm} from "@/features/vehicles/components/VehiculoForm";

export function AddVehicleModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* administrador */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    ⚙️ Admin: Añadir Vehículo
                </button>
            </div>

            {/* modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-gray-50 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">

                        {/* boton x */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-6 text-gray-400 hover:text-gray-800 text-xl font-bold"
                        >
                            ✕
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Añadir Nuevo Vehículo</h2>
                            <VehicleForm onSuccessAction={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}