'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Cliente {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    fechaAlta: string;
}

export function ClientManager() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [clientToDelete, setClientToDelete] = useState<{id: string, nombre: string} | null>(null);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            try {
                const res = await fetch('http://localhost:8080/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: `query { listarClientes { id nombre email telefono direccion fechaAlta } }`
                    })
                });
                const { data } = await res.json();
                if (isMounted && data?.listarClientes) setClientes(data.listarClientes);
            } catch (error) {
                if (isMounted) toast.error("Error al cargar el CRM");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadData();
        return () => { isMounted = false; };
    }, [refreshTrigger]);

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        mutation($nombre: String!, $email: String, $telefono: String, $direccion: String) {
                            crearCliente(nombre: $nombre, email: $email, telefono: $telefono, direccion: $direccion) {
                                id
                            }
                        }
                    `,
                    variables: { nombre, email, telefono, direccion }
                })
            });
            const { errors } = await res.json();
            if (errors) throw new Error("Error GraphQL");
            
            toast.success("¡Cliente añadido a la cartera!");
            setNombre(''); setEmail(''); setTelefono(''); setDireccion('');
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            toast.error("Error al registrar cliente");
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDelete = async (id: string) => {
        try {
            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `mutation($id: ID!) { eliminarCliente(id: $id) }`,
                    variables: { id }
                })
            });
            toast.success("Ficha de cliente eliminada (RGPD)");
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            toast.error("Error al eliminar");
        } finally {
            setClientToDelete(null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative">
                {/* Formulario de Alta */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
                    <h3 className="text-xl font-black text-slate-900 mb-2 italic">Nuevo Cliente</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Añadir al CRM</p>
                    <form onSubmit={handleAddClient} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nombre / Empresa *</label>
                            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Teléfono</label>
                            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Dirección</label>
                            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 mt-4 disabled:opacity-50">
                            {isSubmitting ? "Guardando..." : "Guardar Ficha"}
                        </button>
                    </form>
                </div>

                {/* Tabla de Clientes */}
                <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-xl font-black text-slate-900 italic">Directorio General</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Cliente</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contacto</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Alta</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Borrar</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-10 text-slate-400 font-bold animate-pulse">Cargando base de datos...</td></tr>
                            ) : clientes.map(c => (
                                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-black text-slate-900 text-base">{c.nombre}</div>
                                        <div className="text-xs text-slate-400 mt-1">{c.direccion}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-700">{c.email}</div>
                                        <div className="text-sm font-medium text-slate-700">{c.telefono}</div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-slate-400">
                                        {c.fechaAlta}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => setClientToDelete({id: c.id, nombre: c.nombre})} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Eliminar Ficha">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {clientes.length === 0 && !loading && (
                                <tr><td colSpan={4} className="text-center py-10 text-slate-400 font-bold">No hay clientes registrados aún.</td></tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de Borrado */}
            {clientToDelete && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 border border-slate-100 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto rotate-3">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-xl font-black text-center text-slate-900 mb-3 italic">¿Borrar ficha?</h3>
                        <p className="text-center text-slate-500 font-medium mb-8 text-sm">
                            El cliente <span className="font-black text-slate-900">{clientToDelete.nombre}</span> será eliminado de forma permanente.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setClientToDelete(null)} className="flex-1 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">
                                Cancelar
                            </button>
                            <button onClick={() => confirmDelete(clientToDelete.id)} className="flex-1 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all">
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
