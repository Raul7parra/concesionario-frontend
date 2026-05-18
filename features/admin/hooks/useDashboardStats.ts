'use client';

import { useState, useEffect } from 'react';

interface DashboardLog {
    id: string;
    usuario: string;
    accion: string;
    fecha: string;
    tipoEntidad: string;
    entidadId: string;
    detalles: string;
}

interface DashboardStats {
    totalVehicles: number;
    inventoryValue: number;
    totalSales: number;
    salesRevenue: number;
    recentLogs: DashboardLog[];
}

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats>({
        totalVehicles: 0,
        inventoryValue: 0,
        totalSales: 0,
        salesRevenue: 0,
        recentLogs: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            const query = `
                query {
                    listarVehiculos { precio }
                    listSales { finalPrice }
                    listarLogs { id usuario accion fecha tipoEntidad entidadId detalles }
                }
            `;
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                };

                const res = await fetch('http://localhost:8080/graphql', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ query })
                });

                const { data } = await res.json();
                const vehicles = data?.listarVehiculos || [];
                const sales = data?.listSales || [];

                setStats({
                    totalVehicles: vehicles.length,
                    inventoryValue: vehicles.reduce((acc: number, v: { precio: number }) => acc + (v.precio || 0), 0),
                    totalSales: sales.length,
                    salesRevenue: sales.reduce((acc: number, s: { finalPrice: number }) => acc + (s.finalPrice || 0), 0),
                    recentLogs: [...(data?.listarLogs || [])].reverse()
                });
            } catch (e) {
                console.error("Error cargando el dashboard:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    return { stats, loading };
}
