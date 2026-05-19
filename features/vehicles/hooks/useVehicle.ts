import { Vehicle, VehicleInput } from "../types";

const GRAPHQL_URL = "http://localhost:8080/graphql";

function getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
}

async function fetchGraphQL(query: string, variables = {}) {
    const res = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ query, variables }),
        cache: 'no-store'
    });

    const json = await res.json();

    if (json.errors) {
        console.error("❌ Error de GraphQL devuelto por Spring Boot:", json.errors);
        throw new Error(json.errors[0].message);
    }

    return json;
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
                tipo          
                numeroPuertas  
                cilindrada     
                combustible
                transmision
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

export async function updateVehicle(id: string, vehicle: VehicleInput): Promise<Vehicle> {
    const query = `
        mutation($id: ID!, $input: VehiculoInput!) {
            actualizarVehiculo(id: $id, input: $input) {
                id
            }
        }
    `;
    const json = await fetchGraphQL(query, { id, input: vehicle });
    return json.data?.actualizarVehiculo;
}
