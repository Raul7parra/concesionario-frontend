interface Vehiculo {
    id: string;
    marca: string;
    modelo: string;
    precio: number;
    estado: string;
}

export default async function Home() {
    const res = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query {
                    listarVehiculos {
                        id
                        marca
                        modelo
                        precio
                        estado
                    }
                }
            `,
        }),
        cache: 'no-store'
    });

    const json = await res.json();

    const vehiculos = json.data?.listarVehiculos || [];

    return (
        <main className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">🚗 Catálogo de Vehículos</h1>

            {vehiculos.length === 0 ? (
                <p className="text-gray-500">No hay vehículos registrados en la base de datos.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehiculos.map((coche: Vehiculo) => (
                        <div key={coche.id} className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-bold">{coche.marca} {coche.modelo}</h2>
                            <p className="text-gray-600 mt-2">Estado: <span className="font-medium">{coche.estado}</span></p>
                            <p className="text-blue-600 font-bold text-lg mt-2">{coche.precio} €</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}