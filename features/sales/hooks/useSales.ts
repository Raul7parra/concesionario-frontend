'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Sale {
    id: string;
    client: string;
    vehicleModel: string;
    date: string;
    status: string;
    finalPrice: number;
}

export function useSales() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    // Función auxiliar para obtener las cabeceras con el token
    const getHeaders = () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
        return {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };
    };

    const fetchSalesData = useCallback(async () => {
        try {
            const query = `
                query {
                    listSales {
                        id
                        client
                        vehicleModel
                        finalPrice
                        status
                        date
                    }
                }
            `;
            const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: getHeaders(), // <-- Usamos las cabeceras con el token
                body: JSON.stringify({ query })
            });
            const { data } = await response.json();
            if (data?.listSales) setSales(data.listSales);
        } catch (error) {
            console.error("Error cargando ventas:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteSale = async (id: string) => {
        try {
            const query = `
                mutation {
                    deleteSale(id: "${id}")
                }
            `;
            await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: getHeaders(), // <-- Usamos las cabeceras con el token
                body: JSON.stringify({ query })
            });
            setSales(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error eliminando venta:", error);
        }
    };

    useEffect(() => {
        Promise.resolve().then(() => {
            fetchSalesData();
        });
    }, [fetchSalesData]);


    return { sales, loading, deleteSale, refresh: fetchSalesData };
}
