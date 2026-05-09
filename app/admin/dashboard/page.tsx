import { AddVehicleModal } from "@/features/vehicles/components/AddVehicleModal";
import {getVehicles} from "@/features/vehicles/hooks/useVehicle";

export default async function DashboardPage() {
    const vehicles = await getVehicles();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Gestión de Inventario</h1>
                    <p className="text-slate-500 font-medium">Tienes {vehicles.length} vehículos activos</p>
                </div>
                <AddVehicleModal />
            </div>

            {/* Tabla de Gestión */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Vehículo</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Tipo</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-widest">Precio</th>
                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 tracking-widest text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {vehicles.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                        {v.imagenUrl && <img src={v.imagenUrl} className="w-full h-full object-cover" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{v.marca} {v.modelo}</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase">{v.anio}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{v.tipo}</td>
                            <td className="px-6 py-4 text-sm font-black text-slate-900">{v.precio.toLocaleString()} €</td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">✏️</button>
                                <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">🗑️</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}