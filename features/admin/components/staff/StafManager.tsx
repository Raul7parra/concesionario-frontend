'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
    id: string;
    username: string;
    role: string;
}

export function StaffManager() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [userToDelete, setUserToDelete] = useState<{id: string, username: string} | null>(null);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            try {
                const res = await fetch('http://localhost:8080/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: `query { listarUsuarios { id username role } }`
                    })
                });
                const { data } = await res.json();
                if (isMounted && data?.listarUsuarios) setUsers(data.listarUsuarios);
            } catch (error) {
                if (isMounted) toast.error("Error al cargar los usuarios");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadData();
        return () => { isMounted = false; };
    }, [refreshTrigger]);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUsername || !newPassword) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        mutation($user: String!, $pass: String!) {
                            registerAdmin(username: $user, password: $pass) {
                                id
                                username
                            }
                        }
                    `,
                    variables: { user: newUsername, pass: newPassword }
                })
            });
            const { errors } = await res.json();
            if (errors) throw new Error("Error GraphQL");

            toast.success("¡Empleado registrado con éxito!");
            setNewUsername('');
            setNewPassword('');
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            toast.error("Error al registrar empleado");
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
                    query: `mutation($id: ID!) { eliminarUsuario(id: $id) }`,
                    variables: { id }
                })
            });
            toast.success("Acceso revocado correctamente");
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            toast.error("Error al eliminar");
        } finally {
            setUserToDelete(null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {/* Formulario de Alta */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
                    <h3 className="text-xl font-black text-slate-900 mb-2 italic">Nuevo Empleado</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Dar de alta en el sistema</p>
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Usuario</label>
                            <input type="text" required value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contraseña</label>
                            <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                   className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 mt-4 disabled:opacity-50">
                            {isSubmitting ? "Registrando..." : "Añadir Empleado"}
                        </button>
                    </form>
                </div>

                {/* Tabla de Personal */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-xl font-black text-slate-900 italic">Plantilla Activa</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">ID Único</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Empleado</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Rol</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-10 text-slate-400 font-bold animate-pulse">Cargando personal...</td></tr>
                            ) : users.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4 text-xs font-mono text-slate-400">{user.id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 font-black text-slate-900 text-base">{user.username}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg bg-emerald-50 text-emerald-600">
                                            {user.role || "ADMIN"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => setUserToDelete({id: user.id, username: user.username})} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Revocar Acceso">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmación Bonito */}
            {userToDelete && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 border border-slate-100 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6 mx-auto rotate-3">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-xl font-black text-center text-slate-900 mb-3 italic">¿Revocar acceso?</h3>
                        <p className="text-center text-slate-500 font-medium mb-8 text-sm">
                            El empleado <span className="font-black text-slate-900">{userToDelete.username}</span> será borrado permanentemente de la base de datos.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setUserToDelete(null)} className="flex-1 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">
                                Cancelar
                            </button>
                            <button onClick={() => confirmDelete(userToDelete.id)} className="flex-1 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all">
                                Despedir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
