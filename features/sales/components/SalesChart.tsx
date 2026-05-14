'use client';

import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface SalesData {
    mes: string;
    total: number;
}

export function SalesChart({ data }: { data: SalesData[] }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsClient(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!isClient) return (
        <div className="bg-slate-50 animate-pulse rounded-[3rem] border border-slate-100 flex items-center justify-center" style={{ height: '450px' }}>
            <p className="text-slate-300 font-black tracking-widest uppercase text-xs">Cargando Gráfico...</p>
        </div>
    );

    return (
        <div className="bg-white p-10 pb-16 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col" style={{ height: '450px', minWidth: '100%' }}>
            <h3 className="text-xl font-black text-slate-900 mb-10 italic uppercase tracking-tighter">Evolución de Ingresos</h3>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="mes"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                            dy={15}
                        />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar
                            dataKey="total"
                            fill="#3b82f6"
                            radius={[8, 8, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
