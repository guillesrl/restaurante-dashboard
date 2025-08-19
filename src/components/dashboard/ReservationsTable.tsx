'use client';

import { useState } from 'react';
import { getTodaysReservations } from '@/services/webhookService';

interface Reservation {
  id: string;
  name: string;
  time: string;
  people: number;
  status: string;
}

export function ReservationsTable() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFetchReservations = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    setReservations([]);
    try {
      const response = await getTodaysReservations();
      console.log('Reservations response:', response);
      const reservationsData = response?.output;
      if (Array.isArray(reservationsData)) {
        setReservations(reservationsData);
        if (reservationsData.length === 0) {
          setMessage('No se encontraron reservas para hoy.');
        }
      } else if (typeof reservationsData === 'string') {
        setMessage(reservationsData);
      } else {
        console.error('Received reservations data is not an array:', reservationsData);
        setError('El formato de los datos de las reservas no es válido.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reservations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Reservas de Hoy</h2>
      <button
        onClick={handleFetchReservations}
        disabled={isLoading}
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Cargando...' : 'Mostrar Reservas'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-gray-600 mt-4">{message}</p>}

      {reservations.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((res) => (
              <tr key={res.id}>
                <td className="px-6 py-4 whitespace-nowrap">{res.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{res.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{res.people}</td>
                <td className="px-6 py-4 whitespace-nowrap">{res.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
