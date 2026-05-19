'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Vehicle } from '@/features/vehicles/types';
import { VehicleGallery } from '@/features/vehicles/components/VehicleGallery';
import { VehicleSpecs } from '@/features/vehicles/components/VehicleSpecs';
import { VehicleActions } from '@/features/vehicles/components/VehicleActions';
import { VehicleCard } from '@/features/vehicles/components/VehicleCard';
import { FinancingSimulator } from '@/features/vehicles/components/FinancingSimulator';

export default function VehicleDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [similares, setSimilares] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryVehi = `query Buscar($id: ID!) { 
                    buscarVehiculo(id: $id) { 
                        id 
                        marca 
                        modelo 
                        anio 
                        precio 
                        estado 
                        imagenUrl 
                        tipo 
                        numeroPuertas 
                        cilindrada 
                        combustible
                        transmision
                    } 
                }`;
                const resVehi = await fetch('http://localhost:8080/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: queryVehi, variables: { id } })
                });
                const jsonVehi = await resVehi.json();
                const currentVehicle = jsonVehi.data?.buscarVehiculo;
                setVehicle(currentVehicle);

                const queryAll = `query { 
                    listarVehiculos { 
                        id 
                        marca 
                        modelo 
                        anio 
                        precio 
                        estado 
                        imagenUrl 
                        tipo 
                        numeroPuertas 
                        cilindrada 
                        combustible
                        transmision
                    } 
                }`;
                const resAll = await fetch('http://localhost:8080/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: queryAll })
                });
                const jsonAll = await resAll.json();
                const others = (jsonAll.data?.listarVehiculos || [] as Vehicle[])
                    .filter((v: Vehicle) => v.id !== id)
                    .slice(0, 3);
                setSimilares(others);

            } catch (error: any) {
                console.error("Error al cargar la ficha:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">AutoPremium Intelligence</p>
        </div>
    );

    if (!vehicle) return (
        <div className="p-20 text-center font-black">Vehículo no encontrado</div>
    );

    return (
        <div className="min-h-screen bg-white animate-in fade-in duration-1000">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-50 px-8 py-5 flex justify-between items-center">
                <button onClick={() => router.push('/')} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-all flex items-center gap-3 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al Catálogo
                </button>
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest hidden md:block">
                    {vehicle.marca} <span className="text-blue-600">{vehicle.modelo}</span>
                </p>
                <div className="w-20 md:hidden"></div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 pt-16 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
                    <VehicleGallery imagenUrl={vehicle.imagenUrl} modelo={vehicle.modelo} />

                    <div className="flex flex-col">
                        <div className="mb-12">
                            <div className="flex gap-2 mb-6">
                                <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-xl">
                                    {vehicle.estado}
                                </span>
                            </div>
                            <h1 className="text-blue-600 text-sm font-black uppercase tracking-[0.6em] mb-4">{vehicle.marca}</h1>
                            <h2 className="text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8 italic">{vehicle.modelo}</h2>
                            <div className="flex items-baseline gap-4">
                                <span className="text-6xl font-black text-slate-900 tracking-tighter">
                                    {vehicle.precio.toLocaleString()}
                                </span>
                                <span className="text-3xl font-bold text-slate-200 italic">EUR</span>
                            </div>
                        </div>

                        <VehicleSpecs vehicle={vehicle} />

                        <div className="mb-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-5 text-8xl italic font-black text-slate-900">INFO</div>
                            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-4">Garantía AutoPremium</h4>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                Este vehículo ha superado nuestra inspección técnica de 150 puntos.
                                Incluye garantía oficial de 24 meses y mantenimiento gratuito el primer año.
                            </p>
                        </div>

                        <FinancingSimulator vehicle={vehicle} />

                        <VehicleActions vehicle={vehicle} />
                    </div>
                </div>

                {similares.length > 0 && (
                    <div className="pt-24 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">También te puede interesar</h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-3">Otras joyas de nuestro catálogo</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {similares.map(v => (
                                <VehicleCard key={v.id} vehicle={v} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
