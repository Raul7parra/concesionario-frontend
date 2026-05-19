'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export function ContactForm() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnviando(true);

        try {
            const query = `
                mutation RegisterSale($input: SaleInput!) {
                    registerSale(input: $input) {
                        id
                        client
                        status
                    }
                }
            `;
            const variables = {
                input: {
                    client: nombre,
                    vehicleModel: `Contacto Web: "${mensaje.slice(0, 30)}..."`,
                    finalPrice: 0.0,
                    status: "PENDIENTE_INFO",
                    email: email,
                    telefono: telefono
                }
            };

            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables })
            });

            const json = await res.json();
            if (json.errors) throw new Error(json.errors[0].message);

            toast.success("¡Mensaje enviado con éxito!", {
                description: "Hemos guardado tu consulta en base de datos. Un asesor te responderá pronto."
            });

            setNombre('');
            setEmail('');
            setTelefono('');
            setMensaje('');

        } catch (error) {
            console.error(error);
            toast.error("Error al procesar el envío de contacto");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl animate-in fade-in duration-500">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Contacto Inmediato</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-8 italic">Solicitar información general</h3>

            <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Nombre completo</label>
                    <input
                        required
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej. Roberto Parra"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Correo Electrónico</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@correo.com"
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Teléfono de contacto</label>
                        <input
                            required
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Ej. +34 600 000 000"
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">¿Cómo podemos ayudarte?</label>
                    <textarea
                        required
                        rows={4}
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="Escribe aquí tu consulta o el modelo por el que deseas preguntar..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={enviando}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-600/10 disabled:opacity-50"
                >
                    {enviando ? "Enviando..." : "Enviar Mensaje"}
                </button>
            </form>
        </div>
    );
}
