export function Footer() {
    return (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} AutoPremium. Todos los derechos reservados.</p>
                <p className="mt-2">Sistema de gestión integral para concesionarios.</p>
            </div>
        </footer>
    );
}