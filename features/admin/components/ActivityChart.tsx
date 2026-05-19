'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

interface Log {
    fecha: string;
    accion: string;
}

interface ActivityChartProps {
    logs?: Log[];
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function ActivityChart({ logs = [] }: ActivityChartProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    const data = DAYS.map((day, index) => {
        const count = logs.filter(log => {
            if (!log.fecha) return false;
            const d = new Date(log.fecha);
            return d.getDay() === index;
        }).length;
        return { name: day, Acciones: count };
    });

    const hasData = data.some(d => d.Acciones > 0);

    if (!mounted) return <div className="h-[250px] w-full bg-slate-50 animate-pulse rounded-[2rem]" />;

    return (
        <div className="h-[250px] w-full">
            {!hasData ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-3">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-[10px] font-black uppercase tracking-widest">Sin actividad registrada aún</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAcciones" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#cbd5e1' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '1rem',
                                border: 'none',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                fontWeight: 700,
                                fontSize: 12
                            }}
                            labelStyle={{ color: '#0f172a', fontWeight: 900, fontSize: 10 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="Acciones"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorAcciones)"
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#2563eb' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
