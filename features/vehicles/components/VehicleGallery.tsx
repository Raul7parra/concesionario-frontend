'use client';

export function VehicleGallery({ imagenUrl, modelo }: { imagenUrl?: string, modelo: string }) {
    return (
        <div className="space-y-8">
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

            <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer hover:border-blue-200">
                        <span className="text-2xl">📸</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
