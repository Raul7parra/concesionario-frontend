import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* Marca */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-black tracking-tighter mb-4 inline-block">
                            🚗 Auto<span className="text-blue-500">Premium</span>
                        </Link>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed mt-4 max-w-xs">
                            El concesionario de alta gama de referencia. Coches y motos de lujo con garantía oficial, financiación a medida y entrega inmediata.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-sm">
                                📘
                            </div>
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-sm">
                                📸
                            </div>
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-sm">
                                🐦
                            </div>
                        </div>
                    </div>

                    {/* Catálogo */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-5">Catálogo</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Todos los vehículos</Link></li>
                            <li><Link href="/coches" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Coches de lujo</Link></li>
                            <li><Link href="/motos" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Motos premium</Link></li>
                            <li><Link href="/#catalogo" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Novedades</Link></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-5">Contacto</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-0.5">📍</span>
                                <span className="text-slate-300 text-sm font-medium">Av. de la Constitución, 15<br />28001 Madrid, España</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-blue-500">📞</span>
                                <span className="text-slate-300 text-sm font-medium">+34 900 123 456</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-blue-500">✉️</span>
                                <span className="text-slate-300 text-sm font-medium">info@autopremium.es</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-blue-500">🕐</span>
                                <span className="text-slate-300 text-sm font-medium">Lun–Sáb: 9:00 – 20:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Línea inferior */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs font-medium">
                        © {new Date().getFullYear()} AutoPremium. Todos los derechos reservados.
                    </p>
                    <p className="text-slate-600 text-xs font-medium">
                        Sistema de gestión integral · Protegido por JWT · MongoDB Atlas
                    </p>
                </div>
            </div>
        </footer>
    );
}
