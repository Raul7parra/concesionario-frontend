import { Vehicle, VehicleInput } from "../types";

const GRAPHQL_URL = "http://localhost:8080/graphql";

async function fetchGraphQL(query: string, variables = {}) {
    const res = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
        cache: 'no-store'
    });
    return await res.json();
}

export async function getVehicles(): Promise<Vehicle[]> {
    const query = `
        query {
            listarVehiculos {
                id
                marca
                modelo
                anio
                precio
                estado
                imagenUrl
            }
        }
    `;
    const json = await fetchGraphQL(query);
    return json.data?.listarVehiculos || [];
}

export async function createVehicle(input: VehicleInput): Promise<Vehicle> {
    const query = `
        mutation($input: VehiculoInput!) {
            crearVehiculo(input: $input) {
                id
                marca
                modelo
            }
        }
    `;
    const json = await fetchGraphQL(query, { input });
    return json.data?.crearVehiculo;
}

export async function deleteVehicle(id: string): Promise<boolean> {
    const query = `
        mutation($id: ID!) {
            eliminarVehiculo(id: $id)
        }
    `;
    const json = await fetchGraphQL(query, { id });
    return !!json.data?.eliminarVehiculo;
}