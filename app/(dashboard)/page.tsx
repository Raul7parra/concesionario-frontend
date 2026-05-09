import { VehicleCatalog } from "@/features/vehicles/components/VehicleCatalog";
import {getVehicles} from "@/features/vehicles/hooks/useVehicle";

export default async function HomePage() {
    // Solo cargamos los datos
    const vehicles = await getVehicles();

    return (
        <div className="min-h-screen bg-gray-50 pb-12">

            {/* 1. Nuevo Hero Section (Cabecera visual) */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20 px-6 text-center shadow-inner">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Encuentra tu próximo vehículo
                </h1>
                <p className="text-lg text-blue-200 max-w-2xl mx-auto font-medium">
                    Explora nuestro catálogo premium. Los mejores coches y motos listos para ti.
                </p>
            </div>

            {/* 2. Contenedor principal superpuesto para dar efecto 3D */}
            <main className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
                {/* El catálogo interactivo puro, sin botones de admin */}
                <VehicleCatalog initialVehicles={vehicles} />
            </main>

        </div>
    );
}