"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "../types";
import { FilterBar } from "./FilterBar";
import { VehicleCard } from "./VehicleCard";

export function VehicleCatalog({ initialVehicles }: { initialVehicles: Vehicle[] }) {
    const [busqueda, setBusqueda] = useState("");
    const [filtroTipo, setFiltroTipo] = useState<"TODOS" | "COCHE" | "MOTO">("TODOS");
    const [precioMax, setPrecioMax] = useState(150000);

    const vehiculosFiltrados = useMemo(() => {
        return initialVehicles.filter(vehiculo => {
            const textoLimpio = busqueda.toLowerCase().trim();
            const coincideTexto = `${vehiculo.marca} ${vehiculo.modelo}`.toLowerCase().includes(textoLimpio);
            const coincideTipo = filtroTipo === "TODOS" || vehiculo.tipo === filtroTipo;
            const coincidePrecio = vehiculo.precio <= precioMax;

            return coincideTexto && coincideTipo && coincidePrecio;
        });
    }, [initialVehicles, busqueda, filtroTipo, precioMax]);

    return (
        <div className="space-y-12">
            <FilterBar
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                filtroTipo={filtroTipo}
                setFiltroTipo={setFiltroTipo}
                precioMax={precioMax}
                setPrecioMax={setPrecioMax}
            />

            {vehiculosFiltrados.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 animate-in fade-in zoom-in duration-700">
                    <div className="text-6xl mb-6">🔍</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No hay coincidencias</h3>
                    <p className="text-slate-400 font-medium max-w-xs mx-auto">
                        Intenta ajustar los filtros de precio o búsqueda para encontrar lo que buscas.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {vehiculosFiltrados.map((v) => (
                        <VehicleCard key={v.id} vehicle={v} />
                    ))}
                </div>
            )}
        </div>
    );
}
