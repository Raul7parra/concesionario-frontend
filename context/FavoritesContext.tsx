'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle } from '@/features/vehicles/types';
import { toast } from 'sonner';

interface FavoritesContextType {
    favorites: Vehicle[];
    toggleFavorite: (vehicle: Vehicle) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Vehicle[]>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('autopremium_favorites');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    console.error("Error al parsear favoritos iniciales", e);
                }
            }
        }
        return [];
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (loaded) {
            localStorage.setItem('autopremium_favorites', JSON.stringify(favorites));
        }
    }, [favorites, loaded]);

    const toggleFavorite = (vehicle: Vehicle) => {
        const exists = favorites.some(fav => fav.id === vehicle.id);
        if (exists) {
            setFavorites(prev => prev.filter(fav => fav.id !== vehicle.id));
            toast.info(`Eliminado de tus favoritos`, {
                description: `${vehicle.marca} ${vehicle.modelo} ha sido quitado.`
            });
        } else {
            setFavorites(prev => [...prev, vehicle]);
            toast.success(`¡Añadido a tus favoritos!`, {
                description: `${vehicle.marca} ${vehicle.modelo} guardado en tu lista.`
            });
        }
    };

    const isFavorite = (id: string) => {
        return favorites.some(fav => fav.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
    }
    return context;
}
