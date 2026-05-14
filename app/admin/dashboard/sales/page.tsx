'use client';

import { useMemo } from 'react';
import { StatsCard } from "@/features/admin/components/StatsCard";
import { LeadsTable } from "@/features/sales/components/LeadsTable";
import { useSales } from "@/features/sales/hooks/useSales";

export default function SalesPage() {
    const { sales, loading, deleteSale } = useSales();

    const stats = useMemo(() => {
        const total = sales.reduce((acc, s) => acc + s.finalPrice, 0);
        const ticket = sales.length > 0 ? total / sales.length : 0;
        return { total, ticket, count: sales.length };
    }, [sales]);

    if (loading) return <div className="p-10 font-black italic animate-pulse">Cargando Sales Hub...</div>;

    return (
        <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatsCard label="Ingresos Totales" value={`${stats.total.toLocaleString()} €`} color="emerald" icon="💰" />
                <StatsCard label="Ventas Cerradas" value={stats.count} color="blue" icon="📈" />
                <StatsCard label="Ticket Medio" value={`${stats.ticket.toLocaleString()} €`} color="indigo" icon="🎯" />
            </div>

            <LeadsTable sales={sales} onDelete={deleteSale} />
        </div>
    );
}
