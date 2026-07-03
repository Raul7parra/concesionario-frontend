import { ClientManager } from "@/features/admin/components/clients/ClientManager";

export const dynamic = "force-dynamic";

export default function ClientsPage() {
    return (
        <div className="p-4 sm:p-10 space-y-10 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">CRM Directivo</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                    Directorio Central de Clientes y Leads Comerciales
                </p>
            </div>

            <ClientManager />
        </div>
    );
}
