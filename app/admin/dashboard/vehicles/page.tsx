import { AddVehicleModal } from "@/features/vehicles/components/AddVehicleModal";
import { VehicleTable } from "@/features/admin/components/VehicleTable";
import { getVehicles } from "@/features/vehicles/hooks/useVehicle";
export const dynamic = "force-dynamic";

export default async function VehiclesAdminPage() {
    const vehicles = await getVehicles();

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Inventory</h1>
                    <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest">
                        Gestionando <span className="text-blue-600 font-bold">{vehicles.length}</span> unidades en stock
                    </p>
                </div>
                <AddVehicleModal />
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <VehicleTable initialVehicles={vehicles} />
            </div>
        </div>
    );
}
