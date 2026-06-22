import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {Log} from "@/features/admin/components/audit/type";

export function AuditCharts({ logs }: { logs: Log[] }) {
    const typeStats = logs.reduce((acc, log) => {
        const tipo = log.tipoEntidad || 'OTROS';
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const pieData = Object.keys(typeStats).map(key => ({ name: key, value: typeStats[key] }));
    const COLORS = ['#4f46e5', '#059669', '#2563eb', '#cbd5e1'];

    const activityStats = logs.reduce((acc, log) => {
        const date = new Date(log.fecha).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const barData = Object.keys(activityStats).slice(0, 7).reverse().map(key => ({ date: key, acciones: activityStats[key] }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-48">
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm flex flex-col items-center justify-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Distribución de Impacto</p>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={pieData} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} acciones`, 'Cantidad']} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm flex flex-col items-center justify-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Volumen de Actividad Reciente</p>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                        <XAxis dataKey="date" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: '#f8fafc'}} />
                        <Bar dataKey="acciones" fill="#0f172a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
