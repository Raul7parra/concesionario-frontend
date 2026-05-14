'use client';

import { Vehicle } from "../types";

export function VehicleSpecs({ vehicle }: { vehicle: Vehicle }) {
    const tipoNormalizado = vehicle.tipo?.toUpperCase() || 'COCHE';

    const specs = [
        { label: 'Año', value: vehicle.anio || '2024', icon: '📅' },
        { label: 'Tipo', value: vehicle.tipo || 'Coche', icon: '🏎️' },
        { label: 'Transmisión', value: 'Manual', icon: '⚙️' },
        { label: 'Combustible', value: 'Gasolina', icon: '⛽' },
        {
            label: tipoNormalizado === 'COCHE' ? 'Puertas' : 'Cilindrada',
            value: tipoNormalizado === 'COCHE'
                ? (vehicle.numeroPuertas || 5)
                : `${vehicle.cilindrada || 0}cc`,
            icon: tipoNormalizado === 'COCHE' ? '🚪' : '⚡'
        },
        { label: 'Estado', value: vehicle.estado || 'Nuevo', icon: '✨' }
    ];

    return (
        <div className="grid grid-cols-2 gap-4 mb-12">
            {specs.map((spec, i) => (
                <div key={i} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-50 hover:border-blue-100 hover:bg-white transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg group-hover:scale-125 transition-transform">{spec.icon}</span>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</p>
                    </div>
                    <p className="text-xl font-black text-slate-900 tracking-tighter">
                        {spec.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
