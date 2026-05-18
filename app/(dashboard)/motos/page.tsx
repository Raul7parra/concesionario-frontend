import { VehicleCatalog } from "@/features/vehicles/components/VehicleCatalog";
import { getVehicles } from "@/features/vehicles/hooks/useVehicle";

export const dynamic = "force-dynamic";

export default async function MotosPage() {
    const vehicles = await getVehicles();
    const motos = vehicles.filter((v) => v.tipo === "MOTO");

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-20 px-6 text-center shadow-inner">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Catálogo de Motos
                </h1>
                <p className="text-lg text-indigo-200 max-w-2xl mx-auto font-medium">
                    Descubre nuestra gama de motos premium: velocidad, cilindrada y diseño sobre dos ruedas.
                </p>
            </div>

            <main className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
                <VehicleCatalog
                    initialVehicles={motos}
                    initialTipo="MOTO"
                    hideTypeFilter={true}
                />
            </main>
        </div>
    );
}
