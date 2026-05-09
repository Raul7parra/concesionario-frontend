import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Concesionario App",
    description: "Catálogo de vehículos premium",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
        <body>{children}</body>
        </html>
    );
}