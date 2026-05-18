import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";


export const metadata: Metadata = {
    title: "Concesionario App",
    description: "Catálogo de vehículos premium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body>
        <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
        </body>
        </html>
    );
}
