'use client';

export function VehicleGallery({ imagenUrl, modelo }: { imagenUrl?: string, modelo: string }) {
    return (
        <div className="space-y-8">
            {/* Imagen Principal */}
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-slate-50 shadow-2xl group border border-slate-100">
                {imagenUrl ? (
                    <img
                        src={imagenUrl}
                        alt={modelo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl">🚗</div>
                )}
            </div>

            {/* Bloques de Confianza y Garantía */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-3xl mb-2">🛡️</span>
                    <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Garantía Oficial</h5>
                    <p className="text-[9px] text-slate-400 font-bold mt-1">24 MESES</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-3xl mb-2">🔧</span>
                    <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Certificado</h5>
                    <p className="text-[9px] text-slate-400 font-bold mt-1">150 PUNTOS</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-3xl mb-2">⚡</span>
                    <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Disponibilidad</h5>
                    <p className="text-[9px] text-slate-400 font-bold mt-1">INMEDIATA</p>
                </div>
            </div>
        </div>
    );
}
