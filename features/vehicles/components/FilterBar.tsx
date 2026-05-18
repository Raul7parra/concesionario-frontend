'use client';

interface FilterBarProps {
    busqueda: string;
    setBusqueda: (valor: string) => void;
    precioMax: number;
    setPrecioMax: (precio: number) => void;
}

export function FilterBar({busqueda, setBusqueda, precioMax, setPrecioMax}: FilterBarProps) {
    return (
        <div className="bg-white p-5 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-5 max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Busca por marca o modelo..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-16 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 font-bold outline-none"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-8 px-5 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-8 flex-grow max-w-lg">
                    <div className="flex-grow">
                        <div className="flex justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presupuesto Máximo</span>
                            <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                {precioMax.toLocaleString()} €
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0" max="150000" step="1000"
                            value={precioMax}
                            onChange={(e) => setPrecioMax(Number(e.target.value))}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                </div>
                <button
                    onClick={() => {
                        setBusqueda("");
                        setPrecioMax(150000);
                    }}
                    className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-rose-500 transition-colors"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
}
