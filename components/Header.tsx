import Link from "next/link";

export function Header() {
    return (
        <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-black tracking-tighter">
                    🚗 Auto<span className="text-blue-500">Premium</span>
                </Link>

                <nav className="flex items-center space-x-6 font-medium">
                    <Link href="/" className="hover:text-blue-400 transition-colors">
                        Catálogo
                    </Link>
                </nav>
            </div>
        </header>
    );
}