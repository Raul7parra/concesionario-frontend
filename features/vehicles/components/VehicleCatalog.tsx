"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "../types";
import {FilterBar} from "@/components/FilterBar";
import {Card} from "@/components/Card";
// 1. Corregimos la importación para usar la nueva Card global
// 2. Corregimos la ruta del FilterBar

export function VehicleCatalog({ initialVehicles }: { initialVehicles: Vehicle[] }) {
    const [busqueda, setBusqueda] = useState("");
    const [filtroTipo, setFiltroTipo] = useState<"TODOS" | "COCHE" | "MOTO">("TODOS");

    const vehiculosFiltrados = useMemo(() => {
        return initialVehicles.filter(vehiculo => {
            const textoLimpio = busqueda.toLowerCase().trim();
            const coincideTexto = `${vehiculo.marca} ${vehiculo.modelo}`.toLowerCase().includes(textoLimpio);
            const coincideTipo = filtroTipo === "TODOS" || vehiculo.tipo === filtroTipo;

            return coincideTexto && coincideTipo;
        });
    }, [initialVehicles, busqueda, filtroTipo]);

    return (
        <div className="space-y-10"> {/* He aumentado un poco el espacio aquí */}

            {/* Componente de Filtros Reutilizable */}
            <FilterBar
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                filtroTipo={filtroTipo}
                setFiltroTipo={setFiltroTipo}
            />

            {vehiculosFiltrados.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 text-xl font-medium">
                        No se han encontrado vehículos con esos filtros.
                    </p>
                    <button
                        onClick={() => { setBusqueda(""); setFiltroTipo("TODOS"); }}
                        className="mt-4 text-blue-600 font-bold hover:text-blue-800 transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            ) : (
                // 3. Usamos el componente <Card /> que ahora es el estándar
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {vehiculosFiltrados.map((v) => (
                        <Card key={v.id} vehicle={v} />
                    ))}
                </div>
            )}
        </div>
    );
}