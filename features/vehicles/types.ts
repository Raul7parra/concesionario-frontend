export interface Vehicle {
    id: string;
    marca: string;
    modelo: string;
    anio: number;
    precio: number;
    estado: string;
    imagenUrl?: string;
    tipo: string;
    numeroPuertas?: number;
    cilindrada?: number;
    combustible?: string;
    transmision?: string;
}

export interface VehicleInput {
    marca: string;
    modelo: string;
    anio: number;
    precio: number;
    estado: string;
    tipo: string;
    imagenUrl?: string;
    numeroPuertas?: number;
    cilindrada?: number;
    combustible?: string;
    transmision?: string;
}
