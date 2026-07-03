'use client';

interface StatsCardProps {
    label: string;
    value: string | number;
    subValue?: string;
    icon: React.ReactNode;
    color: "blue" | "emerald" | "amber" | "indigo" | "rose";
}

export function StatsCard({ label, value, subValue, icon, color }: StatsCardProps) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        emerald: "bg-emerald-50 text-emerald-600",
        amber: "bg-amber-50 text-amber-600",
        indigo: "bg-indigo-50 text-indigo-600",
        rose: "bg-rose-50 text-rose-600",
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-2xl ${colors[color]}`}>
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">{value}</h2>
                    {subValue && <span className="text-[10px] font-black text-slate-300 uppercase">{subValue}</span>}
                </div>
            </div>
        </div>
    );
}
