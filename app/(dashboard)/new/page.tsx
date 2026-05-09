import Link from "next/link";
import {VehicleForm} from "@/features/vehicles/components/VehiculoForm";

export default function NewVehiclePage() {
    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                    &larr; Back to catalog
                </Link>
            </div>

            <VehicleForm />
        </main>
    );
}