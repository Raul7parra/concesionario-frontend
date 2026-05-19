import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "AutoPremium | Concesionario Exclusivo",
    description: "Catálogo de vehículos premium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body>
        <AuthProvider>
            <FavoritesProvider>
                {children}
                <Toaster position="top-right" richColors closeButton />
            </FavoritesProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
