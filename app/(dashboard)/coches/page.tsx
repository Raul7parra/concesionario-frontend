import { VehicleCatalog } from "@/features/vehicles/components/VehicleCatalog";
import { getVehicles } from "@/features/vehicles/hooks/useVehicle";

export const dynamic = "force-dynamic";

export default async function CochesPage() {
    const vehicles = await getVehicles();
    const coches = vehicles.filter((v) => v.tipo === "COCHE");

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white py-20 px-6 text-center shadow-inner">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Catálogo de Coches
                </h1>
                <p className="text-lg text-blue-200 max-w-2xl mx-auto font-medium">
                    Explora nuestra exclusiva selección de coches deportivos, berlinas y SUVs de lujo.
                </p>
            </div>

            <main className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
                <VehicleCatalog
                    initialVehicles={coches}
                    initialTipo="COCHE"
                    hideTypeFilter={true}
                />
            </main>
        </div>
    );
}
