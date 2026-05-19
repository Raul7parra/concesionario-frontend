'use client';

import { Vehicle } from "../types";
import Link from 'next/link';
import { useFavorites } from "@/context/FavoritesContext";

interface VehicleCardProps {
    vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
    const tipoNormalizado = vehicle.tipo?.toUpperCase() || 'COCHE';
    const mostrarPuertas = vehicle.numeroPuertas || 5;
    const mostrarCC = vehicle.cilindrada || 0;
    const { toggleFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(vehicle.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(vehicle);
    };

    return (
        <Link href={`/vehicle/${vehicle.id}`} className="block group">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 flex flex-col h-full relative">

                {/* Imagen y Botón Favorito */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-50">
                    {vehicle.imagenUrl ? (
                        <img
                            src={vehicle.imagenUrl}
                            alt={`${vehicle.marca} ${vehicle.modelo}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-200 bg-slate-50">
                            <span className="text-6xl">🚗</span>
                            <p className="text-[10px] font-black uppercase mt-4 tracking-widest">Sin imagen</p>
                        </div>
                    )}

                    {/* Badge Estado */}
                    <div className="absolute top-6 left-6">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md ${
                            vehicle.estado === 'NUEVO' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                            {vehicle.estado}
                        </span>
                    </div>

                    {/* Botón Favorito */}
                    <button
                        onClick={handleFavoriteClick}
                        className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 active:scale-90 hover:scale-115 ${
                            favorite
                                ? 'bg-red-500 border-red-400 text-white'
                                : 'bg-white/70 border-white/20 text-slate-700 hover:bg-white hover:text-red-500'
                        }`}
                        title={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                        <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{vehicle.marca}</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors duration-500">
                            {vehicle.modelo}
                        </h3>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <div className="bg-slate-50 px-3 py-2 rounded-xl flex items-center gap-2">
                            <span className="text-sm">📅</span>
                            <span className="text-xs font-bold text-slate-600">{vehicle.anio || '2024'}</span>
                        </div>

                        <div className="bg-slate-50 px-3 py-2 rounded-xl flex items-center gap-2">
                            <span className="text-sm">
                                {tipoNormalizado === 'COCHE' ? '🚪' : '⚡'}
                            </span>
                            <span className="text-xs font-bold text-slate-600">
                                {tipoNormalizado === 'COCHE'
                                    ? `${mostrarPuertas}P`
                                    : `${mostrarCC}cc`}
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Precio al contado</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">
                                {(vehicle.precio || 0).toLocaleString()}<span className="text-lg ml-1 text-blue-600">€</span>
                            </p>
                        </div>
                        <div className="bg-slate-900 text-white p-4 rounded-2xl group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 shadow-xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
