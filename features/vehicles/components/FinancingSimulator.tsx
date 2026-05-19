'use client';

import { useState } from 'react';
import { Vehicle } from '../types';
import { toast } from 'sonner';

interface FinancingSimulatorProps {
    vehicle: Vehicle;
}

export function FinancingSimulator({ vehicle }: FinancingSimulatorProps) {
    const [entradaPorcentaje, setEntradaPorcentaje] = useState(20); // 20% inicial
    const [meses, setMeses] = useState(48); // 48 meses
    const [solicitando, setSolicitando] = useState(false);
    const precio = vehicle.precio || 0;
    const entrada = Math.round((entradaPorcentaje / 100) * precio);
    const financiado = precio - entrada;
    const tin = 0.0499;
    const interesMensual = tin / 12;
    const cuotaMensual = financiado > 0
        ? (financiado * interesMensual) / (1 - Math.pow(1 + interesMensual, -meses))
        : 0;

    const handleSolicitarPreaprobacion = () => {
        setSolicitando(true);
        setTimeout(() => {
            setSolicitando(false);
            toast.success("¡Solicitud de pre-aprobación enviada!", {
                description: `Hemos registrado tu interés de financiar el ${vehicle.marca} ${vehicle.modelo} por ${Math.round(cuotaMensual)} €/mes.`
            });
        }, 1500);
    };

    return (
        <div className="mb-12 p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-5 text-9xl italic font-black text-blue-900">4.99%</div>

            <div className="flex justify-between items-center mb-6">
                <h4 className="text-blue-900 font-black uppercase tracking-widest text-[10px]">AutoFinance Simulator</h4>
                <span className="bg-blue-600/10 text-blue-700 font-black text-[9px] uppercase px-3 py-1 rounded-full tracking-widest">
                    4.99% TIN Fijo
                </span>
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
                <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Pago Inicial (Entrada):</span>
                        <span className="font-black text-blue-700">{entradaPorcentaje}% ({entrada.toLocaleString()} €)</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="5"
                        value={entradaPorcentaje}
                        onChange={(e) => setEntradaPorcentaje(Number(e.target.value))}
                        className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                        <span>Sin entrada (0%)</span>
                        <span>Máx. entrada (50%)</span>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Plazo de pago:</span>
                        <span className="font-black text-blue-700">{meses} meses</span>
                    </div>
                    <input
                        type="range"
                        min="12"
                        max="84"
                        step="12"
                        value={meses}
                        onChange={(e) => setMeses(Number(e.target.value))}
                        className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                        <span>12 meses</span>
                        <span>84 meses</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Cuota Estimada</p>
                    <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-4xl font-black text-blue-900 tracking-tighter">
                            {Math.round(cuotaMensual).toLocaleString()}
                        </span>
                        <span className="text-sm font-black text-blue-700 italic">€/mes</span>
                    </div>
                </div>
                <button
                    onClick={handleSolicitarPreaprobacion}
                    disabled={solicitando}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest px-6 py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/10 disabled:opacity-50 active:scale-95"
                >
                    {solicitando ? 'Procesando...' : 'Solicitar Pre-aprobación'}
                </button>
            </div>
        </div>
    );
}
