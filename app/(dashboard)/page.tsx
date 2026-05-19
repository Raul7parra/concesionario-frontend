import Link from "next/link";
import { VehicleCatalog } from "@/features/vehicles/components/VehicleCatalog";
import { getVehicles } from "@/features/vehicles/hooks/useVehicle";

export default async function HomePage() {
    const vehicles = await getVehicles();

    return (
        <div className="min-h-screen bg-white">

            <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">

                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
                        alt="Vehículo de lujo AutoPremium"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                    <div className="max-w-2xl">

                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full mb-8">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">
                                {vehicles.length} vehículos disponibles ahora mismo
                            </span>
                        </div>

                        <h1 className="text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6 italic">
                            Tu próximo<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                                vehículo
                            </span><br />
                            te espera.
                        </h1>

                        <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10 max-w-lg">
                            Catálogo premium de coches y motos de alta gama. Selección exclusiva, garantía oficial y financiación a medida.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="#catalogo"
                                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30 hover:-translate-y-0.5 text-sm"
                            >
                                Ver Catálogo
                            </Link>
                            <Link
                                href="/coches"
                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 text-sm"
                            >
                                Solo Coches
                            </Link>
                            <Link
                                href="/motos"
                                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 text-sm"
                            >
                                Solo Motos
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-black text-white tracking-tighter">{vehicles.length}+</p>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Vehículos en Stock</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white tracking-tighter">24h</p>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Respuesta Garantizada</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white tracking-tighter">2 años</p>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Garantía Oficial</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white tracking-tighter">100%</p>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Inspeccionados</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <a href="#catalogo">
                        <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </section>

            <section className="bg-slate-50 py-24 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">La diferencia AutoPremium</p>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">¿Por qué elegirnos?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: '🔍',
                                title: 'Inspección 150 puntos',
                                desc: 'Cada vehículo supera nuestra revisión técnica exhaustiva antes de entrar al stock.'
                            },
                            {
                                icon: '🛡️',
                                title: 'Garantía 24 meses',
                                desc: 'Garantía oficial de 2 años y mantenimiento gratuito durante el primer año.'
                            },
                            {
                                icon: '💳',
                                title: 'Financiación a medida',
                                desc: 'Planes de financiación personalizados adaptados a tu presupuesto y necesidades.'
                            },
                            {
                                icon: '📞',
                                title: 'Asesor personal 24h',
                                desc: 'Tu asesor exclusivo te acompaña durante todo el proceso de compra.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="catalogo" className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Selección Exclusiva</p>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">Nuestro Catálogo</h2>
                    <p className="text-slate-400 font-medium mt-4 max-w-lg mx-auto">
                        {vehicles.length} vehículos de alta gama listos para su entrega inmediata.
                    </p>
                </div>
                <VehicleCatalog initialVehicles={vehicles} />
            </section>

        </div>
    );
}
