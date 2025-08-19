'use client';
import { ReservationsTable } from '@/components/dashboard/ReservationsTable';
import { OrdersTable } from '@/components/dashboard/OrdersTable';
import { MenuDisplay } from '@/components/dashboard/MenuDisplay';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard del Restaurante</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Izquierda */}
          <div className="space-y-8">
            <ReservationsTable />
            <OrdersTable />
          </div>

          {/* Columna Derecha */}
          <div>
            <MenuDisplay />
          </div>
        </div>
      </div>
    </main>
  );
}
