export interface Log {
    id: string;
    usuario: string;
    accion: string;
    tipoEntidad: string;
    entidadId: string;
    detalles: string;
    fecha: string;
    ipAddress?: string;
    userAgent?: string;
}
