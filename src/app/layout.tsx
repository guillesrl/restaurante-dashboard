import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Restaurante",
  description: "Panel de control para gestión de reservas y pedidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900">Restaurante Dashboard</h1>
              </div>
            </header>
            <main className="flex-1 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <footer className="bg-white border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Restaurante Dashboard. Todos los derechos reservados.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
