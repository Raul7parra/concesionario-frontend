"use client";

interface FilterBarProps {
    busqueda: string;
    setBusqueda: (valor: string) => void;
    filtroTipo: "TODOS" | "COCHE" | "MOTO";
    setFiltroTipo: (tipo: "TODOS" | "COCHE" | "MOTO") => void;
    mostrarTabs?: boolean;
}

export function FilterBar({
                              busqueda,
                              setBusqueda,
                              filtroTipo,
                              setFiltroTipo,
                              mostrarTabs = true
                          }: FilterBarProps) {

    return (
        // Le damos un ancho máximo, centrado, y una sombra mucho más elegante y amplia
        <div className="bg-white p-2.5 md:p-3 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-3 justify-between items-center w-full max-w-4xl mx-auto">

            {/* Input de Búsqueda */}
            <div className="relative w-full flex-grow">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    {/* Sustituimos el emoji por un icono SVG moderno */}
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Buscar por marca o modelo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-700 outline-none font-medium placeholder:font-normal"
                />
            </div>

            {/* Botones de Filtro (Estilo Segmented Control de iOS) */}
            {mostrarTabs && (
                <div className="flex bg-gray-100/80 p-1.5 rounded-xl w-full md:w-auto shrink-0">
                    {(["TODOS", "COCHE", "MOTO"] as const).map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => setFiltroTipo(tipo)}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                filtroTipo === tipo
                                    ? "bg-white text-blue-700 shadow-sm ring-1 ring-black/5 scale-100"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 scale-95 hover:scale-100"
                            }`}
                        >
                            {tipo === "TODOS" ? "Todos" : tipo === "COCHE" ? "🚗 Coches" : "🏍️ Motos"}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}