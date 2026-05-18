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
                headers: getHeaders(),
                body: JSON.stringify({ query })
            });
            const { data } = await response.json();
            if (data?.listSales) setSales([...data.listSales].reverse());
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
                headers: getHeaders(),
                body: JSON.stringify({ query })
            });
            setSales(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error eliminando venta:", error);
        }
    };

    const updateSaleStatus = async (id: string, status: string) => {
        try {
            const query = `
                mutation {
                    updateSaleStatus(id: "${id}", status: "${status}") {
                        id
                        status
                    }
                }
            `;
            await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ query })
            });
            setSales(prev => prev.map(s => s.id === id ? { ...s, status: status.toUpperCase() } : s));
        } catch (error) {
            console.error("Error al actualizar estado de venta:", error);
        }
    };

    useEffect(() => {
        Promise.resolve().then(() => {
            fetchSalesData();
        });
    }, [fetchSalesData]);

    return { sales, loading, deleteSale, updateSaleStatus, refresh: fetchSalesData };
}
