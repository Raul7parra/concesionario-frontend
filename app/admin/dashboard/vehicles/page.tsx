import { AddVehicleModal } from "@/features/vehicles/components/AddVehicleModal";
import { VehicleTable } from "@/features/admin/components/vehicles/VehicleTable";
import { getVehicles } from "@/features/vehicles/hooks/useVehicle";
import { StatsCard } from "@/features/admin/components/dashboard/StatsCard";

export const dynamic = "force-dynamic";

export default async function VehiclesAdminPage() {
    const vehicles = await getVehicles();
    const totalValue = vehicles.reduce((sum, v) => sum + v.precio, 0);
    const avgPrice = vehicles.length > 0 ? totalValue / vehicles.length : 0;

    return (
        <div className="p-4 sm:p-10 space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Panel de Inventario</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        Base de Datos General de Vehículos
                    </p>
                </div>
                <AddVehicleModal />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    label="Valor Total del Stock"
                    value={`${totalValue.toLocaleString('es-ES')} €`}
                    color="blue"
                    icon="🏦"
                />
                <StatsCard
                    label="Vehículos en Venta"
                    value={`${vehicles.length} Unidades`}
                    color="emerald"
                    icon="🚗"
                />
                <StatsCard
                    label="Precio Medio"
                    value={`${Math.round(avgPrice).toLocaleString('es-ES')} €`}
                    color="indigo"
                    icon="📊"
                />
            </div>

            <VehicleTable initialVehicles={vehicles} />
        </div>
    );
}
