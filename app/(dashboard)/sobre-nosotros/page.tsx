import { ContactForm } from '@/features/vehicles/components/ContactForm';

export default function SobreNosotrosPage() {
    return (
        <div className="min-h-screen bg-white">

            <section className="relative bg-slate-950 py-32 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1562575084-06b89bd7da0f?q=80&w=2070&auto=format&fit=crop"
                        alt="Boutique Concesionario"
                        className="w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-slate-950/80 to-slate-950" />
                </div>

                <div className="relative z-10 text-center max-w-4xl px-8">
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">AutoPremium Experience</p>
                    <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] italic mb-6">
                        Pasión por la<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Excelencia</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Desde 2012, seleccionamos de forma exclusiva las obras de ingeniería más prestigiosas del automovilismo deportivo y de lujo mundial.
                    </p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">Nuestra Identidad</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 italic">Un legado de confianza y exclusividad</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                        AutoPremium nació con la visión de romper el esquema convencional de compraventa. No somos solo un intermediario; somos curadores de sueños mecánicos. Cada vehículo que entra en nuestro showroom es sometido a un riguroso análisis estructural y forense.
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        Nuestros clientes disfrutan de un servicio de boutique exclusivo: atención personalizada con cita previa, pruebas dinámicas asistidas por pilotos titulados y un club de coleccionistas privado con acceso a preventas exclusivas.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { num: "01", title: "Showroom Boutique", desc: "Espacios de diseño minimalista creados para la contemplación." },
                        { num: "02", title: "Ingeniería Certificada", desc: "Inspección exhaustiva de 150 puntos críticos en taller oficial." },
                        { num: "03", title: "Amortización Inteligente", desc: "Planes financieros cerrados al TIN más bajo del mercado." },
                        { num: "04", title: "Club de Propietarios", desc: "Eventos exclusivos en circuitos nacionales y rutas de montaña." }
                    ].map((val, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100/50 shadow-sm relative group hover:-translate-y-1 transition-all duration-300">
                            <span className="text-blue-500/25 font-black text-4xl italic absolute right-6 top-6">{val.num}</span>
                            <h3 className="font-black text-slate-900 text-base mb-3 pr-8">{val.title}</h3>
                            <p className="text-slate-500 text-xs font-semibold leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-slate-50 py-24 px-8 border-t border-slate-100">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                    <div className="flex flex-col justify-between">
                        <div>
                            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">Ubicación Física</span>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-8 italic">Visítanos en la Capital</h2>

                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                                <div className="flex gap-4 items-start">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Showroom Principal</h4>
                                        <p className="text-slate-500 text-xs font-medium mt-1">Av. de la Constitución, 15, 28001 Madrid, España</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <span className="text-2xl">📞</span>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Línea Exclusiva</h4>
                                        <p className="text-slate-500 text-xs font-medium mt-1">+34 900 123 456</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <span className="text-2xl">✉️</span>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Consultas por Email</h4>
                                        <p className="text-slate-500 text-xs font-medium mt-1">info@autopremium.es</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl h-64 relative">
                            <img
                                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop"
                                alt="Firma de llaves"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/10" />
                        </div>
                    </div>

                    <ContactForm />

                </div>
            </section>

        </div>
    );
}
