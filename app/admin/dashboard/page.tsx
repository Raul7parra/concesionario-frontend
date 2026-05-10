import { AddVehicleModal } from "@/features/vehicles/components/AddVehicleModal";
import { VehicleTable } from "@/features/admin/components/VehicleTable";
import {getVehicles} from "@/features/vehicles/hooks/useVehicle";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const vehicles = await getVehicles();

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Inventario</h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Gestiona los <span className="text-blue-600 font-bold">{vehicles.length}</span> vehículos disponibles.
                    </p>
                </div>
                <AddVehicleModal />
            </div>

            <VehicleTable initialVehicles={vehicles} />
        </div>
    );
}