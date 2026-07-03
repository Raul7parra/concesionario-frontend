import { StaffManager } from "@/features/admin/components/staff/StafManager";

export const dynamic = "force-dynamic";

export default function StaffPage() {
    return (
        <div className="p-4 sm:p-10 space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Gestión de Personal</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                    Departamento de RRHH y Control de Accesos
                </p>
            </div>

            <StaffManager />
        </div>
    );
}
