'use client';

import { useState } from 'react';
import { Vehicle } from '../types';
import { ReservationModal } from './ReservationModal';

export function VehicleActions({ vehicle }: { vehicle: Vehicle }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="mt-auto flex gap-4 pt-10">
                <button className="flex-grow bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0">
                    Solicitar Información
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 hover:-translate-y-1 min-w-[200px]"
                >
                    Reservar
                </button>
            </div>

            <ReservationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                vehicle={vehicle}
            />
        </>
    );
}
