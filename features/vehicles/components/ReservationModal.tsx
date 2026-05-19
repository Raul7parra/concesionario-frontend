'use client';

import { useState } from 'react';
import { Vehicle } from '../types';
import { toast } from "sonner";

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    vehicle: Vehicle;
    mode?: 'reserva' | 'info';
}

export function ReservationModal({ isOpen, onClose, vehicle, mode = 'reserva' }: ReservationModalProps) {
    const [clientName, setClientName] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [loading, setLoading] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState(false);

    if (!isOpen) return null;

    const submitReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName.trim() || !email.trim()) return;

        setLoading(true);
        try {
            const query = `
                mutation($input: SaleInput!) {
                    registerSale(input: $input) {
                        id
                        status
                    }
                }
            `;
            const variables = {
                input: {
                    client: clientName,
                    vehicleModel: `${vehicle.marca} ${vehicle.modelo}`,
                    finalPrice: vehicle.precio || 0,
                    status: mode === 'reserva' ? "RESERVADO" : "PENDIENTE_INFO",
                    email: email,
                    telefono: telefono
                }
            };

            const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables })
            });

            const { data, errors } = await response.json();

            if (errors) {
                console.error("Errores GraphQL:", errors);
                toast.error("Hubo un problema al procesar la solicitud.");
            } else if (data?.registerSale) {
                setReservationSuccess(true);
                const msg = mode === 'reserva'
                    ? `¡Reserva confirmada para ${clientName}!`
                    : `¡Solicitud de información enviada, ${clientName}!`;
                toast.success(msg);

                setTimeout(() => {
                    onClose();
                    setReservationSuccess(false);
                    setClientName('');
                    setEmail('');
                    setTelefono('');
                }, 3000);
            }
        } catch (error) {
            console.error("Error de red:", error);
            toast.error("Error de conexión con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    const isReserva = mode === 'reserva';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => !loading && !reservationSuccess && onClose()}
            />

            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl shadow-black/50 animate-in zoom-in-95 duration-300">

                {reservationSuccess ? (
                    <div className="text-center py-8">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-2">
                            {isReserva ? '¡Reserva Confirmada!' : '¡Solicitud Enviada!'}
                        </h3>
                        <p className="text-slate-500 font-medium">
                            Gracias, <strong>{clientName}</strong>. Nos pondremos en contacto contigo en el email <strong>{email}</strong> a la mayor brevedad posible.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-1">
                                {isReserva ? 'Reserva Exclusiva' : 'Solicitar Información'}
                            </h3>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">
                                {vehicle.marca} <span className="italic">{vehicle.modelo}</span>
                            </h2>
                            <p className="text-slate-500 text-sm font-medium">
                                {isReserva
                                    ? 'Completa tus datos para reservar este vehículo. Nos pondremos en contacto contigo para confirmar los detalles.'
                                    : 'Déjanos tus datos y un asesor te contactará personalmente con toda la información que necesitas.'}
                            </p>
                        </div>

                        <form onSubmit={submitReservation} className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                    Nombre Completo <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Ej. Juan Pérez"
                                    required
                                    autoFocus
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                    Email de Contacto <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="ejemplo@email.com"
                                    required
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
                                    Teléfono <span className="text-slate-300 font-normal normal-case">(opcional)</span>
                                </label>
                                <input
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:font-medium"
                                    placeholder="Ej. 612 345 678"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-colors uppercase tracking-widest text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !clientName.trim() || !email.trim()}
                                    className="flex-grow bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all disabled:opacity-50 shadow-xl shadow-blue-600/20 flex justify-center items-center"
                                >
                                    {loading ? "Procesando..." : isReserva ? "Confirmar Reserva" : "Solicitar Información"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
